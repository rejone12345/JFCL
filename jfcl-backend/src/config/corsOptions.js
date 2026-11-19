// =============================================================================
// config/corsOptions.js — CORS configuration
// Only permits the configured frontend origin during development.
// In production, set FRONTEND_URL to your deployed domain.
// =============================================================================
import { env } from './env.js';

export const corsOptions = {
  origin: env.FRONTEND_URL,
  credentials: true,                // Allow cookies (JWT in httpOnly cookie)
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
