// =============================================================================
// controllers/academicController.js — Sessions, classes, subjects, exams
// =============================================================================
import { sendSuccess } from '../utils/response.js';
import { z } from 'zod';
import {
  getAllSessions, getSessionById, createSession, updateSession, deleteSession,
  getAllClasses, getClassById, createClass, updateClass, deleteClass,
  getAllSubjects, getSubjectById, getSubjectsByClass, createSubject, updateSubject, deleteSubject,
  getAllExaminations, getExaminationById, createExamination, updateExamination, deleteExamination,
  getGradeConfig, replaceGradeConfig,
  getInstitutionStats,
} from '../repositories/academicRepository.js';
import { AppError } from '../utils/AppError.js';

// ── Sessions ─────────────────────────────────────────────────────────────────
export const getSessions       = (req, res, next) => { try { return sendSuccess(res, { data: getAllSessions() }); } catch (e) { next(e); } };
export const getSession        = (req, res, next) => { try { const s = getSessionById(req.params.id); if (!s) throw new AppError('Session not found.', 404); return sendSuccess(res, { data: s }); } catch (e) { next(e); } };
export const addSession        = (req, res, next) => { try { return sendSuccess(res, { data: createSession(req.body), status: 201 }); } catch (e) { next(e); } };
export const editSession       = (req, res, next) => { try { const s = updateSession(req.params.id, req.body); if (!s) throw new AppError('Session not found.', 404); return sendSuccess(res, { data: s }); } catch (e) { next(e); } };
export const removeSession     = (req, res, next) => { try { if (!deleteSession(req.params.id)) throw new AppError('Session not found.', 404); return sendSuccess(res, { message: 'Session deleted.' }); } catch (e) { next(e); } };

// ── Classes ───────────────────────────────────────────────────────────────────
export const getClasses        = (req, res, next) => { try { return sendSuccess(res, { data: getAllClasses() }); } catch (e) { next(e); } };
export const getClassItem      = (req, res, next) => { try { const c = getClassById(req.params.id); if (!c) throw new AppError('Class not found.', 404); return sendSuccess(res, { data: c }); } catch (e) { next(e); } };
export const addClass          = (req, res, next) => { try { return sendSuccess(res, { data: createClass(req.body), status: 201 }); } catch (e) { next(e); } };
export const editClass         = (req, res, next) => { try { const c = updateClass(req.params.id, req.body); if (!c) throw new AppError('Class not found.', 404); return sendSuccess(res, { data: c }); } catch (e) { next(e); } };
export const removeClass       = (req, res, next) => { try { if (!deleteClass(req.params.id)) throw new AppError('Class not found.', 404); return sendSuccess(res, { message: 'Class deleted.' }); } catch (e) { next(e); } };

// ── Subjects ──────────────────────────────────────────────────────────────────
export const getSubjects       = (req, res, next) => { try { const { classId } = req.query; return sendSuccess(res, { data: classId ? getSubjectsByClass(classId) : getAllSubjects() }); } catch (e) { next(e); } };
export const getSubject        = (req, res, next) => { try { const s = getSubjectById(req.params.id); if (!s) throw new AppError('Subject not found.', 404); return sendSuccess(res, { data: s }); } catch (e) { next(e); } };
export const addSubject        = (req, res, next) => { try { return sendSuccess(res, { data: createSubject(req.body), status: 201 }); } catch (e) { next(e); } };
export const editSubject       = (req, res, next) => { try { const s = updateSubject(req.params.id, req.body); if (!s) throw new AppError('Subject not found.', 404); return sendSuccess(res, { data: s }); } catch (e) { next(e); } };
export const removeSubject     = (req, res, next) => { try { if (!deleteSubject(req.params.id)) throw new AppError('Subject not found.', 404); return sendSuccess(res, { message: 'Subject deleted.' }); } catch (e) { next(e); } };

// ── Examinations ──────────────────────────────────────────────────────────────
export const getExams          = (req, res, next) => { try { return sendSuccess(res, { data: getAllExaminations() }); } catch (e) { next(e); } };
export const getExam           = (req, res, next) => { try { const e = getExaminationById(req.params.id); if (!e) throw new AppError('Examination not found.', 404); return sendSuccess(res, { data: e }); } catch (e) { next(e); } };
export const addExam           = (req, res, next) => { try { return sendSuccess(res, { data: createExamination(req.body), status: 201 }); } catch (e) { next(e); } };
export const editExam          = (req, res, next) => { try { const e = updateExamination(req.params.id, req.body); if (!e) throw new AppError('Examination not found.', 404); return sendSuccess(res, { data: e }); } catch (e) { next(e); } };
export const removeExam        = (req, res, next) => { try { if (!deleteExamination(req.params.id)) throw new AppError('Examination not found.', 404); return sendSuccess(res, { message: 'Examination deleted.' }); } catch (e) { next(e); } };

// ── Grade Config ──────────────────────────────────────────────────────────────
export const getGrades         = (req, res, next) => { try { return sendSuccess(res, { data: getGradeConfig() }); } catch (e) { next(e); } };
export const updateGrades      = (req, res, next) => { try { return sendSuccess(res, { data: replaceGradeConfig(req.body) }); } catch (e) { next(e); } };

// ── Dashboard Stats ───────────────────────────────────────────────────────────
export const getDashboardStats  = (req, res, next) => { try { return sendSuccess(res, { data: getInstitutionStats() }); } catch (e) { next(e); } };
