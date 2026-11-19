// =============================================================================
// utils/AppError.js — Custom application error class
// Use this to throw structured errors that the global error handler can catch.
// =============================================================================
export class AppError extends Error {
  /**
   * @param {string} message  - Human-readable error message
   * @param {number} status   - HTTP status code
   * @param {any}   [errors]  - Optional validation errors or extra detail
   */
  constructor(message, status = 400, errors = null) {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}
