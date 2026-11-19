// =============================================================================
// utils/response.js — Consistent API response helpers
// Every controller must use these helpers so the frontend always receives
// a predictable JSON envelope: { success, message, data?, errors?, meta? }
// =============================================================================

/**
 * Send a successful response.
 * @param {import('express').Response} res
 * @param {object}  payload
 * @param {any}     payload.data     - The response payload
 * @param {string}  payload.message  - Human-readable success message
 * @param {number}  payload.status   - HTTP status code (default 200)
 * @param {object}  payload.meta     - Optional pagination / metadata
 */
export const sendSuccess = (res, { data = null, message = 'Success', status = 200, meta = null }) => {
  const body = { success: true, message };
  if (data !== null) body.data = data;
  if (meta !== null) body.meta = meta;
  return res.status(status).json(body);
};

/**
 * Send an error response.
 * @param {import('express').Response} res
 * @param {object}  payload
 * @param {string}  payload.message  - Human-readable error message
 * @param {number}  payload.status   - HTTP status code (default 400)
 * @param {any}     payload.errors   - Optional validation error details
 */
export const sendError = (res, { message = 'An error occurred', status = 400, errors = null }) => {
  const body = { success: false, message };
  if (errors !== null) body.errors = errors;
  return res.status(status).json(body);
};
