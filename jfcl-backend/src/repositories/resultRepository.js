// =============================================================================
// repositories/resultRepository.js — In-memory result submission access layer
// =============================================================================
// ⚠ PHASE 1 TEMPORARY: Replace with Mongoose models in Phase 2.
// =============================================================================
import { resultSubmissions as seedSubmissions } from '../data/seedData.js';

let submissions = seedSubmissions.map((s) => ({ ...s, marks: [...(s.marks || [])] }));

const uid = () => `RSUB${Date.now()}`;

// ── READ ─────────────────────────────────────────────────────────────────────
export const getAllSubmissions     = ()        => submissions;
export const getSubmissionById     = (id)      => submissions.find((s) => s.id === id) ?? null;
export const getSubmissionsByTeacher = (tId)   => submissions.filter((s) => s.teacherId === tId);
export const getSubmissionsByExam  = (eId)     => submissions.filter((s) => s.examId === eId);
export const getPublishedResults   = ()        => submissions.filter((s) => s.status === 'published');

export const getPublishedResultForStudent = (studentId, examId) => {
  const pub = submissions.filter((s) => s.status === 'published' && s.examId === examId);
  // Collect marks across all published subjects for this student
  const subjectMarks = [];
  for (const sub of pub) {
    const mark = sub.marks.find((m) => m.studentId === studentId);
    if (mark) {
      subjectMarks.push({ submissionId: sub.id, subjectId: sub.subjectId, ...mark });
    }
  }
  return subjectMarks;
};

// ── CREATE ────────────────────────────────────────────────────────────────────
export const createSubmission = (data) => {
  const sub = {
    id:          uid(),
    status:      'draft',
    submittedAt: null,
    approvedAt:  null,
    publishedAt: null,
    adminNote:   null,
    marks:       [],
    createdAt:   new Date().toISOString(),
    ...data,
  };
  submissions.push(sub);
  return sub;
};

// ── UPDATE MARKS (upsert individual student mark in a draft) ──────────────────
export const upsertMarkInSubmission = (submissionId, markRow) => {
  const sub = submissions.find((s) => s.id === submissionId);
  if (!sub) return null;
  const idx = sub.marks.findIndex((m) => m.studentId === markRow.studentId);
  if (idx >= 0) {
    sub.marks[idx] = { ...sub.marks[idx], ...markRow };
  } else {
    sub.marks.push(markRow);
  }
  return sub;
};

// Bulk replace marks for a submission
export const replaceMarks = (submissionId, marksArray) => {
  const sub = submissions.find((s) => s.id === submissionId);
  if (!sub) return null;
  sub.marks = marksArray;
  return sub;
};

// ── STATUS TRANSITIONS ────────────────────────────────────────────────────────
export const submitForApproval = (id) => {
  const sub = submissions.find((s) => s.id === id);
  if (!sub || sub.status !== 'draft') return null;
  sub.status      = 'submitted';
  sub.submittedAt = new Date().toISOString();
  return sub;
};

export const approveSubmission = (id, adminNote = null) => {
  const sub = submissions.find((s) => s.id === id);
  if (!sub || sub.status !== 'submitted') return null;
  sub.status     = 'approved';
  sub.approvedAt = new Date().toISOString();
  sub.adminNote  = adminNote;
  return sub;
};

export const publishSubmission = (id) => {
  const sub = submissions.find((s) => s.id === id);
  if (!sub || sub.status !== 'approved') return null;
  sub.status      = 'published';
  sub.publishedAt = new Date().toISOString();
  return sub;
};

export const returnForCorrection = (id, adminNote) => {
  const sub = submissions.find((s) => s.id === id);
  if (!sub || sub.status !== 'submitted') return null;
  sub.status    = 'draft';
  sub.adminNote = adminNote || 'Returned for correction by administrator.';
  return sub;
};

export const deleteSubmission = (id) => {
  const len = submissions.length;
  submissions = submissions.filter((s) => s.id !== id);
  return submissions.length < len;
};
