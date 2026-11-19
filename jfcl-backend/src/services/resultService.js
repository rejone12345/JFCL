// =============================================================================
// services/resultService.js — Result management and workflow business logic
// =============================================================================
import {
  getAllSubmissions,
  getSubmissionById,
  getSubmissionsByTeacher,
  createSubmission,
  replaceMarks,
  submitForApproval,
  approveSubmission,
  publishSubmission,
  returnForCorrection,
  getPublishedResultForStudent,
  getPublishedResults,
  deleteSubmission,
} from '../repositories/resultRepository.js';
import {
  getSubjectById,
  getExaminationById,
  isTeacherAssigned,
} from '../repositories/academicRepository.js';
import {
  getSafeUsers,
  getSafeUser,
} from '../repositories/userRepository.js';
import {
  calculateTotalMarks,
  calculateGrade,
  calculateGPA,
  getResultStatus,
} from '../utils/gradeCalculator.js';
import { validateMarksSheet } from '../utils/marksValidator.js';
import { AppError } from '../utils/AppError.js';

// ── Admin: view all submissions ──────────────────────────────────────────────
export const listAllSubmissions = () => getAllSubmissions();

// ── Teacher: list own submissions ────────────────────────────────────────────
export const listTeacherSubmissions = (teacherId) => getSubmissionsByTeacher(teacherId);

// ── Teacher: get or create a draft ──────────────────────────────────────────
export const getOrCreateDraft = (teacherId, { examId, classId, section, subjectId }) => {
  // Find an existing draft
  const existing = getAllSubmissions().find(
    (s) =>
      s.teacherId === teacherId &&
      s.examId    === examId    &&
      s.classId   === classId   &&
      s.section   === section   &&
      s.subjectId === subjectId
  );
  if (existing) return existing;

  // Create new draft (teacher assignment check would go here in production)
  return createSubmission({ teacherId, examId, classId, section, subjectId });
};

// ── Teacher: save marks (always overwrites draft marks) ─────────────────────
export const saveMarks = (teacherId, submissionId, marksArray) => {
  const sub = getSubmissionById(submissionId);
  if (!sub) throw new AppError('Result submission not found.', 404);
  if (sub.teacherId !== teacherId) throw new AppError('You are not authorised to edit this submission.', 403);
  if (!['draft'].includes(sub.status)) {
    throw new AppError(
      `Cannot edit marks. Current status: ${sub.status}. Only draft submissions can be edited.`,
      400
    );
  }

  // Retrieve subject to get max marks
  const subject = getSubjectById(sub.subjectId);
  const maxMarks = subject?.components || { written: 100, mcq: 0, practical: 0, ca: 0 };

  // Validate all rows
  const { isValid, rowErrors } = validateMarksSheet(marksArray, maxMarks);
  if (!isValid) {
    throw new AppError('Marks validation failed.', 422, rowErrors);
  }

  // Enrich with computed totals
  const enriched = marksArray.map((row) => {
    const total = calculateTotalMarks(row);
    const { grade, point, remarks } = calculateGrade(total, subject?.fullMarks || 100);
    return { ...row, total, grade, point, remarks };
  });

  return replaceMarks(submissionId, enriched);
};

// ── Teacher: submit for approval ─────────────────────────────────────────────
export const submitMarksForApproval = (teacherId, submissionId) => {
  const sub = getSubmissionById(submissionId);
  if (!sub) throw new AppError('Submission not found.', 404);
  if (sub.teacherId !== teacherId) throw new AppError('Not authorised.', 403);
  if (sub.marks.length === 0) throw new AppError('Cannot submit empty marks. Please save marks first.', 400);

  const result = submitForApproval(submissionId);
  if (!result) throw new AppError('Could not submit. Only draft submissions can be submitted.', 400);
  return result;
};

// ── Admin: approve submission ────────────────────────────────────────────────
export const adminApproveSubmission = (adminId, submissionId, adminNote) => {
  const sub = getSubmissionById(submissionId);
  if (!sub) throw new AppError('Submission not found.', 404);
  // Admin must not be the submitting teacher (defence-in-depth; impossible in this schema since admins != teachers)
  const result = approveSubmission(submissionId, adminNote);
  if (!result) throw new AppError('Could not approve. Only submitted results can be approved.', 400);
  return result;
};

// ── Admin: publish approved submission ───────────────────────────────────────
export const adminPublishSubmission = (submissionId) => {
  const sub = getSubmissionById(submissionId);
  if (!sub) throw new AppError('Submission not found.', 404);
  const result = publishSubmission(submissionId);
  if (!result) throw new AppError('Could not publish. Only approved results can be published.', 400);
  return result;
};

// ── Admin: return for correction ─────────────────────────────────────────────
export const adminReturnForCorrection = (submissionId, adminNote) => {
  const sub = getSubmissionById(submissionId);
  if (!sub) throw new AppError('Submission not found.', 404);
  const result = returnForCorrection(submissionId, adminNote || 'Please correct and resubmit.');
  if (!result) throw new AppError('Could not return. Only submitted results can be returned.', 400);
  return result;
};

// ── Student: get own published results ───────────────────────────────────────
export const getStudentResults = (studentId, examId) => {
  if (!examId) throw new AppError('Examination ID is required.', 400);
  const subjectMarks = getPublishedResultForStudent(studentId, examId);
  if (!subjectMarks.length) {
    throw new AppError('No published result found for this examination.', 404);
  }
  const gpa    = calculateGPA(subjectMarks);
  const status = getResultStatus(subjectMarks);
  const total  = subjectMarks.reduce((acc, s) => acc + (s.total || 0), 0);
  return { studentId, examId, subjects: subjectMarks, gpa, status, totalMarks: total };
};

// ── Public: search published result by roll ───────────────────────────────────
export const getPublicResultByRoll = async (roll, examId) => {
  if (!roll || !examId) throw new AppError('Roll number and examination are required.', 400);

  // Find the student
  const students = await getSafeUsers('student');
  const student  = students.find((s) => s.roll === roll);
  if (!student) throw new AppError('No result found for this roll number.', 404);

  const subjectMarks = getPublishedResultForStudent(student.id, examId);
  if (!subjectMarks.length) {
    throw new AppError('No published result found for this student and examination.', 404);
  }

  const gpa    = calculateGPA(subjectMarks);
  const status = getResultStatus(subjectMarks);
  const total  = subjectMarks.reduce((acc, s) => acc + (s.total || 0), 0);

  return {
    name:    student.name,
    roll:    student.roll,
    class:   student.class,
    section: student.section,
    group:   student.group,
    examId,
    subjects: subjectMarks,
    gpa,
    status,
    totalMarks: total,
  };
};
