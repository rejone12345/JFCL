// =============================================================================
// routes/public.routes.js — Unauthenticated public-facing endpoints
// =============================================================================
import { Router } from 'express';
import { getPublicNotices, getNotice, getPublicEvents, getEvent,
         getPublicGallery, addAdmission }
  from '../controllers/contentController.js';
import { publicResultSearch }
  from '../controllers/resultController.js';
import { getSafeUsers } from '../repositories/userRepository.js';
import { getAllExaminations } from '../repositories/academicRepository.js';
import { sendSuccess } from '../utils/response.js';

const router = Router();

// Notices
router.get('/notices',      getPublicNotices);
router.get('/notices/:id',  getNotice);

// Events
router.get('/events',      getPublicEvents);
router.get('/events/:id',  getEvent);

// Gallery
router.get('/gallery', getPublicGallery);

// Public Result Search (by roll + examId — only published results)
router.get('/results', publicResultSearch);

// Public teacher directory
router.get('/teachers', (req, res, next) => {
  try {
    const teachers = getSafeUsers('teacher');
    return sendSuccess(res, { data: teachers });
  } catch (err) { next(err); }
});

// Public examination list (published only)
router.get('/examinations', (req, res, next) => {
  try {
    const exams = getAllExaminations().filter((e) => e.status === 'published');
    return sendSuccess(res, { data: exams });
  } catch (err) { next(err); }
});

// Public admission application (no auth required — anyone can apply)
router.post('/admissions', addAdmission);

export default router;
