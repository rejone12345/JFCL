// =============================================================================
// routes/teacher.routes.js — All /api/v1/teacher/* routes (teacher-only)
// =============================================================================
import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { getOwnProfile, getOwnAssignments }
  from '../controllers/teacherController.js';
import { teacherGetResults, getOrCreateMarksDraft, saveMarksEntry, submitMarks }
  from '../controllers/resultController.js';
import { teacherGetAttendance, teacherSaveAttendance }
  from '../controllers/attendanceController.js';
import { getSafeUsers } from '../repositories/userRepository.js';
import { getAssignmentsByTeacher, getAllSubjects }
  from '../repositories/academicRepository.js';
import { getAllNotices } from '../repositories/contentRepository.js';
import { sendSuccess } from '../utils/response.js';

const router = Router();
router.use(authenticate, authorize('teacher'));

// Profile
router.get('/profile',     getOwnProfile);

// Assignments / Classes
router.get('/assignments', getOwnAssignments);
router.get('/classes',     getOwnAssignments);

// Subjects assigned to this teacher
router.get('/subjects', (req, res, next) => {
  try {
    const myAssignments = getAssignmentsByTeacher(req.user.id);
    const subjectIds    = [...new Set(myAssignments.map((a) => a.subjectId))];
    const allSubjects   = getAllSubjects();
    const mine          = allSubjects.filter((s) => subjectIds.includes(s.id));
    return sendSuccess(res, { data: mine });
  } catch (err) { next(err); }
});

// Students in teacher's assigned classes
router.get('/students', (req, res, next) => {
  try {
    const myAssignments = getAssignmentsByTeacher(req.user.id);
    const myClasses     = myAssignments.map((a) => ({ classId: a.classId, section: a.section }));
    const students      = getSafeUsers('student').filter((s) =>
      myClasses.some(
        (c) => c.classId === `CLS${s.class?.replace(/\D/g, '')}` || s.class?.includes(c.classId)
      )
    );
    return sendSuccess(res, { data: students });
  } catch (err) { next(err); }
});

// Marks Entry
router.post('/marks/draft',                getOrCreateMarksDraft);
router.put('/marks/:submissionId',         saveMarksEntry);
router.post('/marks/:submissionId/submit', submitMarks);

// Results
router.get('/results', teacherGetResults);

// Attendance
router.get('/attendance',  teacherGetAttendance);
router.post('/attendance', teacherSaveAttendance);

// Notices (all notices visible to staff)
router.get('/notices', (req, res, next) => {
  try {
    return sendSuccess(res, { data: getAllNotices(false) });
  } catch (err) { next(err); }
});

export default router;
