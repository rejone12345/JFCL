// =============================================================================
// middleware/auth.js — JWT authentication and role-based authorization
// =============================================================================
import { verifyToken, extractBearerToken } from '../utils/jwt.js';
import { sendError } from '../utils/response.js';

/**
 * authenticate — Verifies the JWT from Authorization header or httpOnly cookie.
 * Attaches req.user = { id, role, name } on success.
 * Returns 401 if the token is missing, invalid, or expired.
 */
export const authenticate = (req, res, next) => {
  // Try Authorization header first, fall back to cookie
  let token = extractBearerToken(req) || req.cookies?.jfcl_token;

  if (!token) {
    return sendError(res, {
      message: 'Authentication required. Please log in.',
      status: 401,
    });
  }

  try {
    const decoded = verifyToken(token);
    if (decoded.purpose === '2fa_pending') {
      return sendError(res, {
        message: 'Two-factor authentication verification is required to complete login.',
        status: 401,
      });
    }
    req.user = { id: decoded.id, role: decoded.role, name: decoded.name };
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return sendError(res, {
        message: 'Session expired. Please log in again.',
        status: 401,
      });
    }
    return sendError(res, {
      message: 'Invalid authentication token.',
      status: 401,
    });
  }
};

/**
 * authorize — Role-based access control.
 * Pass one or more allowed roles: authorize('admin'), authorize('admin','teacher')
 * Must be used AFTER authenticate.
 * @param {...string} roles
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, { message: 'Authentication required.', status: 401 });
    }
    if (!roles.includes(req.user.role)) {
      return sendError(res, {
        message: `Access denied. This resource requires role: [${roles.join(', ')}]. Your role: ${req.user.role}.`,
        status: 403,
      });
    }
    next();
  };
};
