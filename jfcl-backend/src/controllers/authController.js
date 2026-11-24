// =============================================================================
// controllers/authController.js — Auth request handlers
// =============================================================================
import { sendSuccess, sendError } from '../utils/response.js';
import { loginSchema, activateAccountSchema, verifyOtpSchema, resendOtpSchema } from '../validators/authValidators.js';
import { studentSignupSchema } from '../validators/studentValidators.js';
import {
  loginService,
  verifyTwoFactorOtpService,
  resendTwoFactorOtpService,
  registerStudentService,
  activateAccountService,
  getCurrentUserService,
} from '../services/authService.js';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';

const setAuthCookie = (res, token) => {
  res.cookie('jfcl_token', token, {
    httpOnly: true,
    secure:   env.COOKIE_SECURE,
    sameSite: env.COOKIE_SAME_SITE,
    maxAge:   7 * 24 * 60 * 60 * 1000, // 7 days in ms
  });
};

/** POST /api/v1/auth/login */
export const login = async (req, res, next) => {
  try {
    const body   = loginSchema.parse(req.body);
    const result = await loginService(body);

    if (result.requires2FA) {
      return sendSuccess(res, {
        message: `Verification code sent to ${result.maskedEmail}`,
        data:    result,
        status:  200,
      });
    }

    // Set token in httpOnly cookie AND return in body (supports both strategies)
    setAuthCookie(res, result.token);

    return sendSuccess(res, {
      message: `Welcome back, ${result.user.name}!`,
      data:    { token: result.token, user: result.user },
      status:  200,
    });
  } catch (err) { next(err); }
};

/** POST /api/v1/auth/verify-otp */
export const verifyOtp = async (req, res, next) => {
  try {
    const body   = verifyOtpSchema.parse(req.body);
    const result = await verifyTwoFactorOtpService(body);

    setAuthCookie(res, result.token);

    return sendSuccess(res, {
      message: `Welcome back, ${result.user.name}!`,
      data:    { token: result.token, user: result.user },
      status:  200,
    });
  } catch (err) { next(err); }
};

/** POST /api/v1/auth/resend-otp */
export const resendOtp = async (req, res, next) => {
  try {
    const body   = resendOtpSchema.parse(req.body);
    const result = await resendTwoFactorOtpService(body);

    return sendSuccess(res, {
      message: `A new verification code was sent to ${result.maskedEmail}`,
      data:    result,
      status:  200,
    });
  } catch (err) { next(err); }
};

/** POST /api/v1/auth/logout */
export const logout = (req, res) => {
  res.clearCookie('jfcl_token');
  return sendSuccess(res, { message: 'Logged out successfully.' });
};

/** GET /api/v1/auth/me */
export const getMe = async (req, res, next) => {
  try {
    const user = await getCurrentUserService(req.user.id);
    return sendSuccess(res, { data: user });
  } catch (err) { next(err); }
};

/** POST /api/v1/auth/activate */
export const activateAccount = async (req, res, next) => {
  try {
    const body   = activateAccountSchema.parse(req.body);
    const result = await activateAccountService(body);
    return sendSuccess(res, { message: result.message });
  } catch (err) { next(err); }
};

/** POST /api/v1/auth/register-student */
export const registerStudent = async (req, res, next) => {
  try {
    const body   = studentSignupSchema.parse(req.body);
    const result = await registerStudentService(body);
    return sendSuccess(res, {
      message: 'Registration completed successfully! You can now sign in using your Roll Number or Email.',
      data:    result.user,
      status:  201,
    });
  } catch (err) { next(err); }
};
