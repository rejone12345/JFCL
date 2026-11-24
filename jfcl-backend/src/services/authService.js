// =============================================================================
// services/authService.js — Authentication business logic
// =============================================================================
import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import {
  findUserByCredential,
  findUserByEmail,
  findStudentByRoll,
  findUserById,
  verifyPassword,
  activateUser,
  updateUserPassword,
  createUser,
  saveUserTwoFactorOtp,
  incrementUserTwoFactorAttempts,
  clearUserTwoFactorOtp,
} from '../repositories/userRepository.js';
import { signToken, signTwoFactorToken, verifyToken } from '../utils/jwt.js';
import { sendTwoFactorOtpEmail, maskEmail } from './emailService.js';
import { AppError } from '../utils/AppError.js';

const issueAndSendOtp = async (user) => {
  const otp = crypto.randomInt(100000, 1000000).toString();
  const otpHash = await bcrypt.hash(otp, 10);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  const userId = user.id || user._id?.toString();

  await saveUserTwoFactorOtp(userId, {
    otpHash,
    expiresAt,
    lastSentAt: new Date(),
  });

  await sendTwoFactorOtpEmail({
    to: user.email,
    name: user.name,
    otp,
    role: user.role,
  });

  return {
    maskedEmail: maskEmail(user.email),
    expiresInSeconds: 600,
  };
};

const buildSafeUser = (user) => {
  const userId = user.id || user._id?.toString();
  const raw = user.toJSON ? user.toJSON() : { ...user };
  delete raw.password;
  delete raw.activationCode;
  delete raw.twoFactorOtpHash;
  delete raw.twoFactorOtpExpires;
  delete raw.twoFactorOtpAttempts;
  delete raw.twoFactorOtpLastSentAt;
  raw.id = userId;
  return raw;
};

/**
 * Log in a user. Admin completes in one step; Teacher/Student require Email OTP 2FA.
 * @param {{ identifier: string, password: string, role: string }} params
 */
export const loginService = async ({ identifier, password, role }) => {
  const user = await findUserByCredential(identifier, role);

  if (!user) {
    throw new AppError('Invalid credentials. Please check your ID and password.', 401);
  }

  if (user.role !== role) {
    throw new AppError(
      `This account is not registered as a ${role}. Please select the correct portal tab.`,
      401
    );
  }

  if (user.status !== 'active') {
    throw new AppError('This account has been deactivated. Please contact administration.', 403);
  }

  if ((user.role === 'student' || user.role === 'teacher') && user.isActivated === false) {
    throw new AppError(
      `Your ${user.role} account has not been activated yet. Please use the Account Activation page.`,
      403
    );
  }

  const isMatch = await verifyPassword(password, user.password);
  if (!isMatch) {
    throw new AppError('Invalid credentials. Please check your ID and password.', 401);
  }

  const userId = user.id || user._id?.toString();

  if (user.role === 'teacher' || user.role === 'student') {
    if (!user.email) {
      throw new AppError(
        'No email address is linked to this account for Two-Factor Authentication. Please contact administration.',
        400
      );
    }
    const otpMeta = await issueAndSendOtp(user);
    const tempToken = signTwoFactorToken({ id: userId, role: user.role });
    return { requires2FA: true, tempToken, ...otpMeta };
  }

  const payload = { id: userId, role: user.role, name: user.name };
  const token   = signToken(payload);

  return { requires2FA: false, token, user: buildSafeUser(user) };
};

/**
 * Verify the 6-digit Email OTP using the temporary pre-auth token and issue the full JWT.
 */
export const verifyTwoFactorOtpService = async ({ tempToken, otp }) => {
  let decoded;
  try {
    decoded = verifyToken(tempToken);
  } catch {
    throw new AppError('Verification session expired or invalid. Please sign in again.', 401);
  }

  if (decoded.purpose !== '2fa_pending') {
    throw new AppError('Invalid verification token.', 401);
  }

  const user = await findUserById(decoded.id);
  if (!user || user.status !== 'active' || (user.role !== 'teacher' && user.role !== 'student')) {
    throw new AppError('Account not eligible for verification. Please sign in again.', 401);
  }

  const userId = user.id || user._id?.toString();

  if (
    !user.twoFactorOtpHash ||
    !user.twoFactorOtpExpires ||
    new Date(user.twoFactorOtpExpires).getTime() < Date.now()
  ) {
    await clearUserTwoFactorOtp(userId);
    throw new AppError('Verification code has expired. Please sign in again or request a new code.', 400);
  }

  if ((user.twoFactorOtpAttempts || 0) >= 5) {
    await clearUserTwoFactorOtp(userId);
    throw new AppError('Maximum verification attempts exceeded. Please sign in again.', 429);
  }

  const isValid = await verifyPassword(otp, user.twoFactorOtpHash);
  if (!isValid) {
    const attempts = await incrementUserTwoFactorAttempts(userId);
    if (attempts >= 5) {
      await clearUserTwoFactorOtp(userId);
      throw new AppError('Maximum verification attempts exceeded. Please sign in again.', 429);
    }
    throw new AppError(`Invalid verification code. ${5 - attempts} attempt(s) remaining.`, 401);
  }

  await clearUserTwoFactorOtp(userId);

  const payload = { id: userId, role: user.role, name: user.name };
  const token   = signToken(payload);

  return { token, user: buildSafeUser(user) };
};

/**
 * Re-generate and re-send a 6-digit Email OTP for a pending 2FA session.
 */
export const resendTwoFactorOtpService = async ({ tempToken }) => {
  let decoded;
  try {
    decoded = verifyToken(tempToken);
  } catch {
    throw new AppError('Verification session expired or invalid. Please sign in again.', 401);
  }

  if (decoded.purpose !== '2fa_pending') {
    throw new AppError('Invalid verification token.', 401);
  }

  const user = await findUserById(decoded.id);
  if (!user || user.status !== 'active' || (user.role !== 'teacher' && user.role !== 'student') || !user.email) {
    throw new AppError('Account not eligible for verification. Please sign in again.', 401);
  }

  if (process.env.NODE_ENV !== 'test' && user.twoFactorOtpLastSentAt) {
    const elapsed = Date.now() - new Date(user.twoFactorOtpLastSentAt).getTime();
    if (elapsed < 45_000) {
      throw new AppError('Please wait a moment before requesting another verification code.', 429);
    }
  }

  return issueAndSendOtp(user);
};

/**
 * Self-register a student account. Stores user in MongoDB and allows immediate sign in
 * with Roll Number or Email + Password.
 */
export const registerStudentService = async (data) => {
  const email = data.email.trim().toLowerCase();
  const roll  = data.roll.trim();

  const existingEmail = await findUserByEmail(email);
  if (existingEmail) {
    throw new AppError('An account with this email address already exists.', 409);
  }

  const existingRoll = await findStudentByRoll(roll);
  if (existingRoll) {
    throw new AppError('A student with this roll number is already registered.', 409);
  }

  const studentId = `STU${Date.now()}`;
  const created = await createUser({
    id:             studentId,
    studentId,
    name:           data.name.trim(),
    email,
    roll,
    class:          data.class,
    section:        data.section || 'A',
    group:          data.group || 'Science',
    gender:         data.gender || undefined,
    dob:            data.dob || '',
    guardian:       data.guardianName.trim(),
    phone:          data.phone || '',
    contact:        data.phone || '',
    password:       data.password,
    role:           'student',
    status:         'active',
    isActivated:    true,
    activationCode: null,
  });

  return { user: created };
};

/**
 * Activate an institutional student or teacher account with their code.
 */
export const activateAccountService = async ({ idOrIdentifier, activationCode, password }) => {
  const success = await activateUser(idOrIdentifier, activationCode);
  if (!success) {
    throw new AppError(
      'Invalid ID / Email or activation code. Please contact administration.',
      400
    );
  }
  // Set the user's chosen password
  await updateUserPassword(idOrIdentifier, password);
  return { message: 'Account activated successfully. You may now log in.' };
};

/**
 * Get the currently authenticated user's safe profile.
 */
export const getCurrentUserService = async (userId) => {
  const user = await findUserById(userId);
  if (!user) throw new AppError('User not found.', 404);
  const raw = user.toJSON ? user.toJSON() : { ...user };
  delete raw.password;
  delete raw.activationCode;
  raw.id = user.id || user._id?.toString();
  return raw;
};
