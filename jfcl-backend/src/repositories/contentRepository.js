// =============================================================================
// repositories/contentRepository.js — In-memory notices, events, gallery,
//                                     admissions data access
// =============================================================================
// ⚠ PHASE 1 TEMPORARY: Replace with Mongoose models in Phase 2.
// =============================================================================
import {
  notices   as seedNotices,
  events    as seedEvents,
  gallery   as seedGallery,
  admissions as seedAdmissions,
} from '../data/seedData.js';

let notices    = [...seedNotices];
let events     = [...seedEvents];
let gallery    = [...seedGallery];
let admissions = [...seedAdmissions];

const uid = (prefix) => `${prefix}${Date.now()}`;

// ── NOTICES ─────────────────────────────────────────────────────────────────
export const getAllNotices     = (publicOnly = false) =>
  publicOnly ? notices.filter((n) => n.isPublic) : notices;
export const getNoticeById    = (id) => notices.find((n) => n.id === id) ?? null;
export const createNotice     = (data) => { const n = { id: uid('NOT'), createdAt: new Date().toISOString(), ...data }; notices.push(n); return n; };
export const updateNotice     = (id, d) => { const i = notices.findIndex((n) => n.id === id); if (i < 0) return null; notices[i] = { ...notices[i], ...d }; return notices[i]; };
export const deleteNotice     = (id) => { const l = notices.length; notices = notices.filter((n) => n.id !== id); return notices.length < l; };

// ── EVENTS ───────────────────────────────────────────────────────────────────
export const getAllEvents      = () => events;
export const getEventById     = (id) => events.find((e) => e.id === id) ?? null;
export const createEvent      = (data) => { const e = { id: uid('EV'), createdAt: new Date().toISOString(), ...data }; events.push(e); return e; };
export const updateEvent      = (id, d) => { const i = events.findIndex((e) => e.id === id); if (i < 0) return null; events[i] = { ...events[i], ...d }; return events[i]; };
export const deleteEvent      = (id) => { const l = events.length; events = events.filter((e) => e.id !== id); return events.length < l; };

// ── GALLERY ──────────────────────────────────────────────────────────────────
export const getAllGallery     = () => gallery;
export const getGalleryById   = (id) => gallery.find((g) => g.id === id) ?? null;
export const createGalleryItem= (data) => { const g = { id: uid('GAL'), createdAt: new Date().toISOString(), ...data }; gallery.push(g); return g; };
export const deleteGalleryItem= (id) => { const l = gallery.length; gallery = gallery.filter((g) => g.id !== id); return gallery.length < l; };

// ── ADMISSIONS ───────────────────────────────────────────────────────────────
export const getAllAdmissions  = () => admissions;
export const getAdmissionById = (id) => admissions.find((a) => a.id === id) ?? null;
export const createAdmission  = (data) => { const a = { id: uid('ADM'), status: 'pending', date: new Date().toISOString().split('T')[0], ...data }; admissions.push(a); return a; };
export const updateAdmission  = (id, d) => { const i = admissions.findIndex((a) => a.id === id); if (i < 0) return null; admissions[i] = { ...admissions[i], ...d }; return admissions[i]; };
export const deleteAdmission  = (id) => { const l = admissions.length; admissions = admissions.filter((a) => a.id !== id); return admissions.length < l; };
