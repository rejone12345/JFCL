// =============================================================================
// repositories/userRepository.js — Hybrid Mongo & In-Memory Fallback
// =============================================================================
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { seedUsers } from '../data/seedUsers.js';

let inMemoryUsers = [];

const isDbConnected = () => mongoose.connection.readyState === 1;

/** Strip password from user object */
const sanitize = (user) => {
  if (!user) return null;
  if (user.toJSON) {
    return user.toJSON();
  }
  const { password, activationCode, ...safe } = user;
  return safe;
};

export const initUserRepository = async () => {
  if (isDbConnected()) {
    console.log('[UserRepository] Connected to MongoDB. Verifying collections...');
    return;
  }
  // In-memory fallback
  inMemoryUsers = await Promise.all(
    seedUsers.map(async (u) => ({
      ...u,
      password: await bcrypt.hash(u.password, 12),
    }))
  );
  console.log(`[UserRepository] In-memory active with ${inMemoryUsers.length} seed users.`);
};

export const findUserById = async (id) => {
  if (isDbConnected()) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return User.findById(id);
    }
    return User.findOne({
      $or: [{ id: id }, { studentId: id }, { teacherId: id }, { email: id.toLowerCase() }],
    });
  }
  const lower = id.toLowerCase();
  return (
    inMemoryUsers.find(
      (u) =>
        u.id === id ||
        u.teacherId === id ||
        u.studentId === id ||
        u.email?.toLowerCase() === lower ||
        u.username?.toLowerCase() === lower
    ) ?? null
  );
};

export const findUserByEmail = async (email) => {
  if (isDbConnected()) {
    return User.findOne({ email: email?.toLowerCase() });
  }
  return inMemoryUsers.find((u) => u.email === email?.toLowerCase()) ?? null;
};

export const findUserByCredential = async (identifier) => {
  const lower = identifier?.toLowerCase();
  if (isDbConnected()) {
    return User.findOne({
      $or: [
        { email: lower },
        { username: lower },
        { teacherId: identifier },
        { studentId: identifier },
        { roll: identifier },
      ],
    });
  }
  return (
    inMemoryUsers.find(
      (u) =>
        u.email === lower ||
        u.username === lower ||
        u.teacherId === identifier ||
        u.studentId === identifier ||
        u.roll === identifier
    ) ?? null
  );
};

export const getAllUsers = async (role = null, includeActivationCode = false) => {
  if (isDbConnected()) {
    const filter = role ? { role } : {};
    const list = await User.find(filter);
    return list.map((doc) => {
      const json = doc.toJSON();
      if (includeActivationCode && doc.activationCode) {
        json.activationCode = doc.activationCode;
      }
      return json;
    });
  }
  return (role ? inMemoryUsers.filter((u) => u.role === role) : inMemoryUsers).map((u) => {
    const safe = sanitize(u);
    if (includeActivationCode && u.activationCode) {
      safe.activationCode = u.activationCode;
    }
    return safe;
  });
};

export const getSafeUser = async (id) => {
  const user = await findUserById(id);
  return sanitize(user);
};

export const getSafeUsers = async (role, includeActivationCode = false) => {
  return getAllUsers(role, includeActivationCode);
};

export const createUser = async (userData) => {
  const hashed = await bcrypt.hash(userData.password, 12);
  if (isDbConnected()) {
    const doc = await User.create({
      ...userData,
      password: hashed,
    });
    return sanitize(doc);
  }
  const newUser = {
    ...userData,
    id: userData.id || `USR${Date.now()}`,
    password: hashed,
    status: userData.status || 'active',
    createdAt: new Date().toISOString(),
  };
  inMemoryUsers.push(newUser);
  return sanitize(newUser);
};

export const updateUser = async (id, updates) => {
  const { password, role, ...safeUpdates } = updates;
  if (isDbConnected()) {
    const query = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { $or: [{ id }, { studentId: id }, { teacherId: id }] };
    const doc = await User.findOneAndUpdate(query, safeUpdates, { new: true });
    return sanitize(doc);
  }
  const idx = inMemoryUsers.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  inMemoryUsers[idx] = { ...inMemoryUsers[idx], ...safeUpdates, updatedAt: new Date().toISOString() };
  return sanitize(inMemoryUsers[idx]);
};

export const updateUserPassword = async (id, newPassword) => {
  const hashed = await bcrypt.hash(newPassword, 12);
  const lower = id.toLowerCase();
  if (isDbConnected()) {
    const query = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { $or: [{ id }, { studentId: id }, { teacherId: id }, { email: lower }] };
    const res = await User.updateOne(query, { password: hashed });
    return res.modifiedCount > 0;
  }
  const idx = inMemoryUsers.findIndex(
    (u) =>
      u.id === id ||
      u.studentId === id ||
      u.teacherId === id ||
      u.email?.toLowerCase() === lower ||
      u.username?.toLowerCase() === lower
  );
  if (idx === -1) return false;
  inMemoryUsers[idx].password = hashed;
  return true;
};

export const activateUser = async (idOrIdentifier, activationCode) => {
  if (isDbConnected()) {
    const user = await User.findOne({
      $or: [
        { studentId: idOrIdentifier },
        { teacherId: idOrIdentifier },
        { email: idOrIdentifier.toLowerCase() },
        { _id: mongoose.Types.ObjectId.isValid(idOrIdentifier) ? idOrIdentifier : null },
      ],
      activationCode,
    });
    if (!user) return false;
    user.isActivated = true;
    user.activationCode = null;
    await user.save();
    return true;
  }
  const idx = inMemoryUsers.findIndex(
    (u) =>
      (u.studentId === idOrIdentifier ||
       u.teacherId === idOrIdentifier ||
       u.id === idOrIdentifier ||
       u.email === idOrIdentifier.toLowerCase()) &&
      u.activationCode === activationCode
  );
  if (idx === -1) return false;
  inMemoryUsers[idx].isActivated = true;
  inMemoryUsers[idx].activationCode = null;
  return true;
};

export const deleteUser = async (id) => {
  if (isDbConnected()) {
    const query = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { $or: [{ id }, { studentId: id }, { teacherId: id }] };
    const res = await User.deleteOne(query);
    return res.deletedCount > 0;
  }
  const len = inMemoryUsers.length;
  inMemoryUsers = inMemoryUsers.filter((u) => u.id !== id);
  return inMemoryUsers.length < len;
};

export const verifyPassword = async (rawPassword, hashedPassword) => {
  return bcrypt.compare(rawPassword, hashedPassword);
};
