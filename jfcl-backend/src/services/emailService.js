// =============================================================================
// services/emailService.js — Gmail SMTP email delivery for 2FA OTP
// =============================================================================
import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';

const testOtpStore = new Map();

/**
 * Retrieve the last OTP generated for an email during automated tests.
 * Always returns undefined outside NODE_ENV === 'test'.
 */
export const getLastTestOtp = (email) =>
  process.env.NODE_ENV === 'test' ? testOtpStore.get(email?.toLowerCase()) : undefined;

/**
 * Mask an email address for UI hints (e.g. "ra***1@student.jfcl.edu.bd").
 */
export const maskEmail = (email = '') => {
  const [local = '', domain = ''] = email.split('@');
  if (!domain) return '***';
  if (local.length <= 2) return `${local[0] || '*'}***@${domain}`;
  return `${local.slice(0, 2)}***${local.slice(-1)}@${domain}`;
};

/**
 * Send a 6-digit Two-Factor Authentication OTP via Gmail SMTP.
 */
export const sendTwoFactorOtpEmail = async ({ to, name, otp, role }) => {
  if (process.env.NODE_ENV === 'test') {
    testOtpStore.set(to.toLowerCase(), otp);
    return;
  }

  if (!env.SMTP_USER || !env.SMTP_PASS) {
    if (env.IS_PRODUCTION) {
      throw new AppError(
        'Email service (SMTP) is not configured on the server. Please configure SMTP_USER and SMTP_PASS.',
        503
      );
    }
    console.log(`[DEV 2FA EMAIL] To: ${to} (${role}) | OTP: ${otp}`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });

  const roleLabel = role === 'teacher' ? 'Teacher' : 'Student';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background: #172554; color: #ffffff; padding: 20px 24px;">
        <h2 style="margin: 0; font-size: 18px;">JFCL School &amp; College</h2>
        <p style="margin: 4px 0 0; font-size: 12px; color: #cbd5e1;">${roleLabel} Portal Two-Factor Verification</p>
      </div>
      <div style="padding: 24px; color: #1e293b; font-size: 14px; line-height: 1.6;">
        <p style="margin-top: 0;">Hello <strong>${name || roleLabel}</strong>,</p>
        <p>Use the following 6-digit verification code to complete your ${roleLabel} portal sign-in:</p>
        <div style="margin: 20px 0; padding: 14px; background: #f8fafc; border: 1px dashed #94a3b8; border-radius: 8px; text-align: center;">
          <span style="font-family: monospace; font-size: 28px; font-weight: 700; letter-spacing: 6px; color: #0f172a;">${otp}</span>
        </div>
        <p style="font-size: 12px; color: #475569;">This verification code expires in <strong>10 minutes</strong>. If you did not request this login, please ignore this email or contact administration.</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: env.SMTP_FROM,
      to,
      subject: 'JFCL Portal — Your 6-Digit Login Verification Code',
      text: `Hello ${name || roleLabel},\n\nYour 6-digit JFCL ${roleLabel} Portal verification code is: ${otp}\n\nThis verification code expires in 10 minutes.\n`,
      html,
    });
  } catch (err) {
    console.error('[EmailService] Failed to send 2FA OTP email:', err.message);
    throw new AppError(
      'Failed to send OTP verification email. Please check your email address or try again shortly.',
      502
    );
  }
};
