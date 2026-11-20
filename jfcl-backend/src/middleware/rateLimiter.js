// =============================================================================
// middleware/rateLimiter.js — Configurable Express rate limiters
// =============================================================================
import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

/** General API rate limiter — applied to all /api/v1 routes */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,         // 15-minute window
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please wait 15 minutes before trying again.',
  },
});

/** Strict limiter for auth endpoints (login, activation, password reset) */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,                           // Only 10 login attempts per 15 min
  skip: () => process.env.NODE_ENV === 'test',
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. Please wait 15 minutes.',
  },
});
