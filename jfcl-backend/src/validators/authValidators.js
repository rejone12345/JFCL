// =============================================================================
// validators/authValidators.js — Zod schemas for authentication endpoints
// =============================================================================
import { z } from 'zod';

export const loginSchema = z.object({
  identifier: z.string().min(1, 'Username, email, roll or ID is required').trim(),
  password:   z.string().min(1, 'Password is required'),
  role:       z.enum(['admin', 'teacher', 'student'], {
    errorMap: () => ({ message: 'Role must be admin, teacher, or student' }),
  }),
});

export const activateAccountSchema = z.object({
  idOrIdentifier: z.string().min(1, 'Student ID, Teacher ID or Email is required').trim(),
  activationCode: z.string().min(1, 'Activation code is required').trim(),
  password:       z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword:z.string().min(1, 'Please confirm your password'),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword:     z.string().min(8, 'New password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm new password'),
}).refine((d) => d.newPassword === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const verifyOtpSchema = z.object({
  tempToken: z.string().min(1, 'Verification token is required'),
  otp:       z.string().trim().regex(/^\d{6}$/, 'Verification code must be 6 digits'),
});

export const resendOtpSchema = z.object({
  tempToken: z.string().min(1, 'Verification token is required'),
});
