// =============================================================================
// middleware/errorHandler.js — Global Express error handler
// Must be registered as the LAST middleware in app.js.
// Handles: AppError (operational), Zod validation errors, JWT errors,
//          and unexpected runtime errors.
// Never exposes stack traces in production.
// =============================================================================
import { ZodError } from 'zod';
import { sendError } from '../utils/response.js';
import { AppError } from '../utils/AppError.js';
import { env } from '../config/env.js';

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  // --- Zod schema validation error ---
  if (err instanceof ZodError) {
    const errors = err.errors.reduce((acc, e) => {
      const key = e.path.join('.');
      acc[key] = e.message;
      return acc;
    }, {});
    return sendError(res, {
      message: 'Validation failed. Please check your input.',
      status: 422,
      errors,
    });
  }

  // --- JWT errors ---
  if (err.name === 'JsonWebTokenError') {
    return sendError(res, { message: 'Invalid or malformed token.', status: 401 });
  }
  if (err.name === 'TokenExpiredError') {
    return sendError(res, { message: 'Session expired. Please log in again.', status: 401 });
  }

  // --- MongoDB duplicate key error ---
  if (err && err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return sendError(res, {
      message: `An account with this ${field} already exists.`,
      status: 409,
    });
  }

  // --- Operational AppError ---
  if (err instanceof AppError) {
    return sendError(res, {
      message: err.message,
      status:  err.status,
      errors:  err.errors,
    });
  }

  // --- Unknown / programming error ---
  if (!env.IS_PRODUCTION) {
    // In dev, include stack trace for debugging
    console.error('[UNHANDLED ERROR]', err);
    return res.status(500).json({
      success: false,
      message: err.message || 'Internal server error',
      stack:   err.stack,
    });
  }

  // In production, never leak internals
  console.error('[UNHANDLED ERROR]', err);
  return sendError(res, { message: 'An unexpected error occurred. Please try again.', status: 500 });
};

// =============================================================================
// 404 handler — register before errorHandler but after all routes
// =============================================================================
export const notFoundHandler = (req, res) => {
  return sendError(res, {
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    status: 404,
  });
};
