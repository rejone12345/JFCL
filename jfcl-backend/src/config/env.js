// =============================================================================
// config/env.js — Centralised environment validation and export
// All backend code must import from here, never from process.env directly.
// =============================================================================
import 'dotenv/config';

const required = (key) => {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required environment variable: ${key}`);
  return val;
};

export const env = {
  NODE_ENV:        process.env.NODE_ENV        || 'development',
  PORT:            parseInt(process.env.PORT   || '5000', 10),
  FRONTEND_URL:    process.env.FRONTEND_URL    || 'http://localhost:5173',
  JWT_SECRET:      required('JWT_SECRET'),
  JWT_EXPIRES_IN:  process.env.JWT_EXPIRES_IN  || '7d',
  COOKIE_SECURE:   process.env.COOKIE_SECURE   === 'true',
  COOKIE_SAME_SITE:process.env.COOKIE_SAME_SITE || 'lax',
  RATE_LIMIT_MAX:  parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  IS_PRODUCTION:   process.env.NODE_ENV === 'production',
  MONGODB_URI:     process.env.MONGODB_URI || '',
  SMTP_HOST:       process.env.SMTP_HOST   || 'smtp.gmail.com',
  SMTP_PORT:       parseInt(process.env.SMTP_PORT || '587', 10),
  SMTP_SECURE:     process.env.SMTP_SECURE === 'true',
  SMTP_USER:       (process.env.SMTP_USER  || '').trim(),
  SMTP_PASS:       (process.env.SMTP_PASS  || '').replace(/\s+/g, ''),
  SMTP_FROM:       process.env.SMTP_FROM   || process.env.SMTP_USER || 'JFCL School & College <no-reply@jfcl.edu.bd>',
};
