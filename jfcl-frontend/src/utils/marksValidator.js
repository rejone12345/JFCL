export const validateMark = (value, max = 100, fieldName = 'Mark') => {
  if (value === '' || value === null || value === undefined) {
    return { valid: true, error: null }; // Optional / in-progress entry
  }
  const num = Number(value);
  if (isNaN(num)) {
    return { valid: false, error: `${fieldName} must be a number` };
  }
  if (num < 0) {
    return { valid: false, error: `${fieldName} cannot be negative` };
  }
  if (num > max) {
    return { valid: false, error: `${fieldName} cannot exceed maximum (${max})` };
  }
  return { valid: true, error: null };
};

export const validateMarksRow = (row, maxMarks = { written: 70, mcq: 30, practical: 0, ca: 0 }) => {
  const errors = {};
  if (row.written !== undefined) {
    const res = validateMark(row.written, maxMarks.written, 'Written');
    if (!res.valid) errors.written = res.error;
  }
  if (row.mcq !== undefined) {
    const res = validateMark(row.mcq, maxMarks.mcq, 'MCQ');
    if (!res.valid) errors.mcq = res.error;
  }
  if (row.practical !== undefined) {
    const res = validateMark(row.practical, maxMarks.practical, 'Practical');
    if (!res.valid) errors.practical = res.error;
  }
  if (row.ca !== undefined) {
    const res = validateMark(row.ca, maxMarks.ca, 'Continuous Assessment');
    if (!res.valid) errors.ca = res.error;
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
