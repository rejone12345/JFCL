// =============================================================================
// controllers/contentController.js — Notices, Events, Gallery, Admissions
// =============================================================================
import { sendSuccess } from '../utils/response.js';
import {
  getAllNotices, getNoticeById, createNotice, updateNotice, deleteNotice,
  getAllEvents,  getEventById,  createEvent,  updateEvent,  deleteEvent,
  getAllGallery, getGalleryById, createGalleryItem, deleteGalleryItem,
  getAllAdmissions, getAdmissionById, createAdmission, updateAdmission, deleteAdmission,
} from '../repositories/contentRepository.js';
import { AppError } from '../utils/AppError.js';

// ── NOTICES ──────────────────────────────────────────────────────────────────

export const getPublicNotices  = (req, res, next) => { try { return sendSuccess(res, { data: getAllNotices(true) }); } catch (e) { next(e); } };
export const getAdminNotices   = (req, res, next) => { try { return sendSuccess(res, { data: getAllNotices(false) }); } catch (e) { next(e); } };
export const getNotice         = (req, res, next) => { try { const n = getNoticeById(req.params.id); if (!n) throw new AppError('Notice not found.', 404); return sendSuccess(res, { data: n }); } catch (e) { next(e); } };
export const addNotice         = (req, res, next) => { try { return sendSuccess(res, { data: createNotice({ ...req.body, createdBy: req.user.id }), status: 201 }); } catch (e) { next(e); } };
export const editNotice        = (req, res, next) => { try { const n = updateNotice(req.params.id, req.body); if (!n) throw new AppError('Notice not found.', 404); return sendSuccess(res, { data: n }); } catch (e) { next(e); } };
export const removeNotice      = (req, res, next) => { try { if (!deleteNotice(req.params.id)) throw new AppError('Notice not found.', 404); return sendSuccess(res, { message: 'Notice deleted.' }); } catch (e) { next(e); } };

// ── EVENTS ───────────────────────────────────────────────────────────────────
export const getPublicEvents   = (req, res, next) => { try { return sendSuccess(res, { data: getAllEvents() }); } catch (e) { next(e); } };
export const getEvent          = (req, res, next) => { try { const e = getEventById(req.params.id); if (!e) throw new AppError('Event not found.', 404); return sendSuccess(res, { data: e }); } catch (e) { next(e); } };
export const addEvent          = (req, res, next) => { try { return sendSuccess(res, { data: createEvent(req.body), status: 201 }); } catch (e) { next(e); } };
export const editEvent         = (req, res, next) => { try { const e = updateEvent(req.params.id, req.body); if (!e) throw new AppError('Event not found.', 404); return sendSuccess(res, { data: e }); } catch (e) { next(e); } };
export const removeEvent       = (req, res, next) => { try { if (!deleteEvent(req.params.id)) throw new AppError('Event not found.', 404); return sendSuccess(res, { message: 'Event deleted.' }); } catch (e) { next(e); } };

// ── GALLERY ───────────────────────────────────────────────────────────────────
export const getPublicGallery  = (req, res, next) => { try { return sendSuccess(res, { data: getAllGallery() }); } catch (e) { next(e); } };
export const addGalleryItem    = (req, res, next) => { try { return sendSuccess(res, { data: createGalleryItem(req.body), status: 201 }); } catch (e) { next(e); } };
export const removeGalleryItem = (req, res, next) => { try { if (!deleteGalleryItem(req.params.id)) throw new AppError('Gallery item not found.', 404); return sendSuccess(res, { message: 'Gallery item deleted.' }); } catch (e) { next(e); } };

// ── ADMISSIONS ────────────────────────────────────────────────────────────────
export const getAdmissions     = (req, res, next) => { try { return sendSuccess(res, { data: getAllAdmissions() }); } catch (e) { next(e); } };
export const getAdmission      = (req, res, next) => { try { const a = getAdmissionById(req.params.id); if (!a) throw new AppError('Admission not found.', 404); return sendSuccess(res, { data: a }); } catch (e) { next(e); } };
export const addAdmission      = (req, res, next) => { try { return sendSuccess(res, { data: createAdmission(req.body), status: 201, message: 'Admission application submitted.' }); } catch (e) { next(e); } };
export const editAdmission     = (req, res, next) => { try { const a = updateAdmission(req.params.id, req.body); if (!a) throw new AppError('Admission not found.', 404); return sendSuccess(res, { data: a }); } catch (e) { next(e); } };
export const removeAdmission   = (req, res, next) => { try { if (!deleteAdmission(req.params.id)) throw new AppError('Admission not found.', 404); return sendSuccess(res, { message: 'Admission deleted.' }); } catch (e) { next(e); } };
