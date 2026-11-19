// =============================================================================
// controllers/authController.js — Auth request handlers
// =============================================================================
import { sendSuccess, sendError } from '../utils/response.js';
import { loginSchema, activateAccountSchema } from '../validators/authValidators.js';
import { loginService, activateAccountService, getCurrentUserService } from '../services/authService.js';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';

/** POST /api/v1/auth/login */
export const login = async (req, res, next) => {
  try {
    const body   = loginSchema.parse(req.body);
    const result = await loginService(body);

    // Set token in httpOnly cookie AND return in body (supports both strategies)
    res.cookie('jfcl_token', result.token, {
      httpOnly: true,
      secure:   env.COOKIE_SECURE,
      sameSite: env.COOKIE_SAME_SITE,
      maxAge:   7 * 24 * 60 * 60 * 1000, // 7 days in ms
    });

    return sendSuccess(res, {
      message: `Welcome back, ${result.user.name}!`,
      data:    { token: result.token, user: result.user },
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
