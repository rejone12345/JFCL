// =============================================================================
// repositories/userRepository.js — Hybrid Mongo & In-Memory Fallback
// =============================================================================
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { seedUsers } from '../data/seedUsers.js';

let inMemoryUsers = [];

const isDbConnected = () => mongoose.connection.readyState === 1;

/** Strip empty/null sparse unique fields so MongoDB sparse indexes don't collide */
const cleanSparseFields = (obj) => {
  const cleaned = { ...obj };
  for (const key of ['email', 'username', 'teacherId', 'studentId']) {
    if (cleaned[key] === '' || cleaned[key] === null) {
      delete cleaned[key];
    }
  }
  return cleaned;
};

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

export const findStudentByRoll = async (roll) => {
  const trimmed = roll?.trim();
  if (!trimmed) return null;
  if (isDbConnected()) {
    return User.findOne({ role: 'student', roll: trimmed });
  }
  return inMemoryUsers.find((u) => u.role === 'student' && u.roll === trimmed) ?? null;
};

export const findUserByCredential = async (identifier, role = null) => {
  const trimmed = identifier?.trim();
  const lower = trimmed?.toLowerCase();
  if (!trimmed) return null;

  if (isDbConnected()) {
    const orConditions = [
      { email: lower },
      { username: lower },
      { teacherId: trimmed },
      { studentId: trimmed },
      { roll: trimmed },
    ];
    if (role) {
      const roleMatch = await User.findOne({ role, $or: orConditions });
      if (roleMatch) return roleMatch;
    }
    return User.findOne({ $or: orConditions });
  }

  const matchesIdentifier = (u) =>
    u.email === lower ||
    u.username === lower ||
    u.teacherId === trimmed ||
    u.studentId === trimmed ||
    u.roll === trimmed;

  if (role) {
    const roleMatch = inMemoryUsers.find((u) => u.role === role && matchesIdentifier(u));
    if (roleMatch) return roleMatch;
  }
  return inMemoryUsers.find(matchesIdentifier) ?? null;
};

export const getAllUsers = async (role = null, includeActivationCode = false) => {
  if (isDbConnected()) {
    const filter = role ? { role } : {};
    const list = await User.find(filter).sort({ createdAt: -1 });
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
  const cleaned = cleanSparseFields(userData);
  if (isDbConnected()) {
    const doc = await User.create({
      ...cleaned,
      password: hashed,
    });
    return sanitize(doc);
  }
  const newUser = {
    ...cleaned,
    id: cleaned.id || `USR${Date.now()}`,
    password: hashed,
    status: cleaned.status || 'active',
    createdAt: new Date().toISOString(),
  };
  inMemoryUsers.push(newUser);
  return sanitize(newUser);
};

export const updateUser = async (id, updates) => {
  const { password, role, ...safeUpdates } = updates;
  const cleaned = cleanSparseFields(safeUpdates);
  if (isDbConnected()) {
    const query = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { $or: [{ id }, { studentId: id }, { teacherId: id }] };
    const doc = await User.findOneAndUpdate(query, cleaned, { new: true });
    return sanitize(doc);
  }
  const idx = inMemoryUsers.findIndex(
    (u) => u.id === id || u.studentId === id || u.teacherId === id
  );
  if (idx === -1) return null;
  inMemoryUsers[idx] = { ...inMemoryUsers[idx], ...cleaned, updatedAt: new Date().toISOString() };
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
  inMemoryUsers = inMemoryUsers.filter(
    (u) => u.id !== id && u.studentId !== id && u.teacherId !== id
  );
  return inMemoryUsers.length < len;
};

export const verifyPassword = async (rawPassword, hashedPassword) => {
  return bcrypt.compare(rawPassword, hashedPassword);
};
