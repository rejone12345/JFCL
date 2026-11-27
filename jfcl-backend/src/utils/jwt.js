// =============================================================================
// utils/jwt.js — JWT sign and verify helpers
// Uses jsonwebtoken. Tokens are signed with the JWT_SECRET from .env.
// The token payload carries: id, role, name.
// =============================================================================
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

/**
 * Sign a JWT for the given user payload.
 * @param {{ id: string, role: string, name: string }} payload
 * @returns {string} signed JWT
 */
export const signToken = (payload) => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
};

/**
 * Verify a JWT and return its decoded payload.
 * Throws JsonWebTokenError or TokenExpiredError on failure.
 * @param {string} token
 * @returns {object} decoded payload
 */
export const verifyToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};

/**
 * Extract a Bearer token from the Authorization header.
 * Returns null if the header is missing or malformed.
 * @param {import('express').Request} req
 * @returns {string|null}
 */
export const extractBearerToken = (req) => {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer ')) {
    return auth.slice(7);
  }
  return null;
};
