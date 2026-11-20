// =============================================================================
// services/authService.js — Authentication business logic
// =============================================================================
import {
  findUserByCredential,
  findUserById,
  verifyPassword,
  activateUser,
  updateUserPassword,
  createUser,
} from '../repositories/userRepository.js';
import { signToken } from '../utils/jwt.js';
import { AppError } from '../utils/AppError.js';

/**
 * Log in a user. Validates credentials and returns JWT + safe user profile.
 * @param {{ identifier: string, password: string, role: string }} params
 * @returns {{ token: string, user: object }}
 */
export const loginService = async ({ identifier, password, role }) => {
  const user = await findUserByCredential(identifier);

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
  const payload = { id: userId, role: user.role, name: user.name };
  const token   = signToken(payload);

  const raw = user.toObject ? user.toObject() : { ...user };
  delete raw.password;
  delete raw.activationCode;
  raw.id = userId;

  return { token, user: raw };
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
  const raw = user.toObject ? user.toObject() : { ...user };
  delete raw.password;
  delete raw.activationCode;
  raw.id = user.id || user._id?.toString();
  return raw;
};
