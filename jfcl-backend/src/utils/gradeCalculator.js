// =============================================================================
// utils/gradeCalculator.js — Bangladesh SSC/HSC grade calculation logic
// Mirrors the frontend gradeCalculator.js so both sides agree.
// This is the authoritative server-side implementation.
// =============================================================================

/**
 * Bangladesh grading scale (SSC / HSC pattern)
 * Percentage ranges → Grade letter, Grade Point, Remarks
 */
const GRADE_SCALE = [
  { min: 80, grade: 'A+', point: 5.0, remarks: 'Outstanding' },
  { min: 70, grade: 'A',  point: 4.0, remarks: 'Excellent'   },
  { min: 60, grade: 'A-', point: 3.5, remarks: 'Very Good'   },
  { min: 50, grade: 'B',  point: 3.0, remarks: 'Good'        },
  { min: 40, grade: 'C',  point: 2.0, remarks: 'Satisfactory'},
  { min: 33, grade: 'D',  point: 1.0, remarks: 'Pass'        },
  { min: 0,  grade: 'F',  point: 0.0, remarks: 'Fail'        },
];

/**
 * Calculate grade for a subject.
 * @param {number} marks     - Marks obtained
 * @param {number} fullMarks - Full marks for the subject (default 100)
 * @returns {{ grade: string, point: number, remarks: string }}
 */
export const calculateGrade = (marks, fullMarks = 100) => {
  if (typeof marks !== 'number' || isNaN(marks)) {
    return { grade: 'F', point: 0.0, remarks: 'Invalid' };
  }
  const pct = (marks / fullMarks) * 100;
  for (const row of GRADE_SCALE) {
    if (pct >= row.min) return { grade: row.grade, point: row.point, remarks: row.remarks };
  }
  return { grade: 'F', point: 0.0, remarks: 'Fail' };
};

/**
 * Sum all mark components.
 * @param {{ written?: number, mcq?: number, practical?: number, ca?: number }} components
 * @returns {number}
 */
export const calculateTotalMarks = ({ written = 0, mcq = 0, practical = 0, ca = 0 } = {}) => {
  return Number(written || 0) + Number(mcq || 0) + Number(practical || 0) + Number(ca || 0);
};

/**
 * Calculate overall GPA from an array of subject results.
 * Returns '0.00' if any subject has grade F.
 * @param {Array<{ grade: string, point: number }>} subjects
 * @returns {string}
 */
export const calculateGPA = (subjects = []) => {
  if (!subjects.length) return '0.00';
  const hasFail = subjects.some((s) => s.grade === 'F');
  if (hasFail) return '0.00';
  const total = subjects.reduce((acc, s) => acc + (Number(s.point) || 0), 0);
  return (total / subjects.length).toFixed(2);
};

/**
 * Determine pass/fail for the whole result.
 * A student passes only if no subject has grade F.
 * @param {Array<{ grade: string }>} subjects
 * @returns {'Passed'|'Failed'}
 */
export const getResultStatus = (subjects = []) => {
  return subjects.some((s) => s.grade === 'F') ? 'Failed' : 'Passed';
};
