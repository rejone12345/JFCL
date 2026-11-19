// =============================================================================
// repositories/academicRepository.js — In-memory academic data access
// Covers: sessions, classes, subjects, teacher assignments, examinations
// =============================================================================
// ⚠ PHASE 1 TEMPORARY: Replace with Mongoose models in Phase 2.
// =============================================================================
import {
  sessions        as seedSessions,
  classes         as seedClasses,
  subjects        as seedSubjects,
  teacherAssignments as seedAssignments,
  examinations    as seedExams,
  gradeConfig     as seedGradeConfig,
  institutionStats as seedStats,
} from '../data/seedData.js';

// Mutable in-memory stores
let sessions         = [...seedSessions];
let classes          = [...seedClasses];
let subjects         = [...seedSubjects];
let assignments      = [...seedAssignments];
let examinations     = [...seedExams];
let gradeConfig      = [...seedGradeConfig];
let institutionStats = { ...seedStats };

const uid = (prefix) => `${prefix}${Date.now()}`;

// ── SESSIONS ─────────────────────────────────────────────────────────────────
export const getAllSessions     = ()       => sessions;
export const getSessionById     = (id)     => sessions.find((s) => s.id === id) ?? null;
export const createSession      = (data)   => { const s = { id: uid('SES'), ...data }; sessions.push(s); return s; };
export const updateSession      = (id, d)  => { const i = sessions.findIndex((s) => s.id === id); if (i < 0) return null; sessions[i] = { ...sessions[i], ...d }; return sessions[i]; };
export const deleteSession      = (id)     => { const l = sessions.length; sessions = sessions.filter((s) => s.id !== id); return sessions.length < l; };

// ── CLASSES ───────────────────────────────────────────────────────────────────
export const getAllClasses      = ()       => classes;
export const getClassById      = (id)     => classes.find((c) => c.id === id) ?? null;
export const createClass       = (data)   => { const c = { id: uid('CLS'), ...data }; classes.push(c); return c; };
export const updateClass       = (id, d)  => { const i = classes.findIndex((c) => c.id === id); if (i < 0) return null; classes[i] = { ...classes[i], ...d }; return classes[i]; };
export const deleteClass       = (id)     => { const l = classes.length; classes = classes.filter((c) => c.id !== id); return classes.length < l; };

// ── SUBJECTS ──────────────────────────────────────────────────────────────────
export const getAllSubjects     = ()       => subjects;
export const getSubjectById    = (id)     => subjects.find((s) => s.id === id) ?? null;
export const getSubjectsByClass= (cId)    => subjects.filter((s) => s.classId === cId);
export const createSubject     = (data)   => { const s = { id: uid('SUB'), ...data }; subjects.push(s); return s; };
export const updateSubject     = (id, d)  => { const i = subjects.findIndex((s) => s.id === id); if (i < 0) return null; subjects[i] = { ...subjects[i], ...d }; return subjects[i]; };
export const deleteSubject     = (id)     => { const l = subjects.length; subjects = subjects.filter((s) => s.id !== id); return subjects.length < l; };

// ── TEACHER ASSIGNMENTS ───────────────────────────────────────────────────────
export const getAllAssignments          = ()         => assignments;
export const getAssignmentsByTeacher   = (tId)      => assignments.filter((a) => a.teacherId === tId);
export const getAssignmentsByClass     = (cId, sec) => assignments.filter((a) => a.classId === cId && (!sec || a.section === sec));
export const createAssignment          = (data)     => { const a = { id: uid('ASSIGN'), ...data }; assignments.push(a); return a; };
export const deleteAssignment          = (id)       => { const l = assignments.length; assignments = assignments.filter((a) => a.id !== id); return assignments.length < l; };

/** Check whether a teacher is assigned to a specific class+section+subject */
export const isTeacherAssigned = (teacherId, classId, section, subjectId) =>
  assignments.some(
    (a) =>
      a.teacherId === teacherId &&
      a.classId   === classId   &&
      a.section   === section   &&
      a.subjectId === subjectId
  );

// ── EXAMINATIONS ──────────────────────────────────────────────────────────────
export const getAllExaminations  = ()      => examinations;
export const getExaminationById  = (id)    => examinations.find((e) => e.id === id) ?? null;
export const createExamination   = (data)  => { const e = { id: uid('EX'), createdAt: new Date().toISOString(), ...data }; examinations.push(e); return e; };
export const updateExamination   = (id, d) => { const i = examinations.findIndex((e) => e.id === id); if (i < 0) return null; examinations[i] = { ...examinations[i], ...d }; return examinations[i]; };
export const deleteExamination   = (id)    => { const l = examinations.length; examinations = examinations.filter((e) => e.id !== id); return examinations.length < l; };

// ── GRADE CONFIG ─────────────────────────────────────────────────────────────
export const getGradeConfig      = ()      => gradeConfig;
export const replaceGradeConfig  = (cfg)   => { gradeConfig = cfg; return gradeConfig; };

// ── STATS ─────────────────────────────────────────────────────────────────────
export const getInstitutionStats  = ()     => institutionStats;
export const updateInstitutionStats = (d)  => { institutionStats = { ...institutionStats, ...d }; return institutionStats; };
