// =============================================================================
// routes/student.routes.js — All /api/v1/student/* routes (student-only)
// Privacy: students access ONLY their own data, enforced via req.user.id from JWT.
// =============================================================================
import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { getOwnProfile, getOwnResults, getOwnNotices, getNoticeForStudent, getOwnAcademics }
  from '../controllers/studentPortalController.js';
import { studentGetAttendance }
  from '../controllers/attendanceController.js';

const router = Router();
router.use(authenticate, authorize('student'));

router.get('/profile',        getOwnProfile);
router.get('/results',        getOwnResults);
router.get('/marksheets',     getOwnResults);   // alias for marksheet view
router.get('/attendance',     studentGetAttendance);
router.get('/notices',        getOwnNotices);
router.get('/notices/:id',    getNoticeForStudent);
router.get('/academics',      getOwnAcademics);

export default router;
