// =============================================================================
// utils/marksValidator.js — Server-side marks validation
// Mirrors frontend marksValidator.js. Used in the marks-entry service.
// =============================================================================

/**
 * Validate a single mark component.
 * @param {any}    value     - Raw value from request
 * @param {number} max       - Maximum allowed value
 * @param {string} fieldName - Human-readable field label for error messages
 * @returns {{ valid: boolean, error: string|null }}
 */
export const validateMark = (value, max = 100, fieldName = 'Mark') => {
  if (value === '' || value === null || value === undefined) {
    return { valid: true, error: null }; // allow empty (in-progress entry)
  }
  const num = Number(value);
  if (isNaN(num))  return { valid: false, error: `${fieldName} must be a number` };
  if (num < 0)     return { valid: false, error: `${fieldName} cannot be negative` };
  if (num > max)   return { valid: false, error: `${fieldName} cannot exceed maximum (${max})` };
  return { valid: true, error: null };
};

/**
 * Validate all mark components for a single student row.
 * @param {object} row       - { written, mcq, practical, ca }
 * @param {object} maxMarks  - { written, mcq, practical, ca }
 * @returns {{ isValid: boolean, errors: object }}
 */
export const validateMarksRow = (
  row,
  maxMarks = { written: 70, mcq: 30, practical: 0, ca: 0 }
) => {
  const errors = {};
  const fields = ['written', 'mcq', 'practical', 'ca'];
  const labels = { written: 'Written', mcq: 'MCQ', practical: 'Practical', ca: 'CA' };

  for (const field of fields) {
    if (row[field] !== undefined) {
      const res = validateMark(row[field], maxMarks[field] || 0, labels[field]);
      if (!res.valid) errors[field] = res.error;
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};

/**
 * Validate an entire marks sheet (array of student rows).
 * @param {Array}  rows     - Array of mark rows
 * @param {object} maxMarks - Component limits
 * @returns {{ isValid: boolean, rowErrors: object }}  rowErrors keyed by studentId
 */
export const validateMarksSheet = (rows, maxMarks) => {
  const rowErrors = {};
  for (const row of rows) {
    const res = validateMarksRow(row, maxMarks);
    if (!res.isValid) rowErrors[row.studentId] = res.errors;
  }
  return { isValid: Object.keys(rowErrors).length === 0, rowErrors };
};
