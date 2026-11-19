// =============================================================================
// routes/admin.routes.js — All /api/v1/admin/* routes (admin-only)
// =============================================================================
import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { getStudents, getStudent, addStudent, editStudent, removeStudent }
  from '../controllers/studentController.js';
import { getTeachers, getTeacher, addTeacher, editTeacher, removeTeacher,
         getAssignments, assignTeacher, unassignTeacher }
  from '../controllers/teacherController.js';
import { getSessions, getSession, addSession, editSession, removeSession,
         getClasses, getClassItem, addClass, editClass, removeClass,
         getSubjects, getSubject, addSubject, editSubject, removeSubject,
         getExams, getExam, addExam, editExam, removeExam,
         getGrades, updateGrades, getDashboardStats }
  from '../controllers/academicController.js';
import { adminGetAllResults, adminResultAction }
  from '../controllers/resultController.js';
import { adminGetAttendance }
  from '../controllers/attendanceController.js';
import { getAdminNotices, getNotice, addNotice, editNotice, removeNotice,
         getPublicEvents, getEvent, addEvent, editEvent, removeEvent,
         getPublicGallery, addGalleryItem, removeGalleryItem,
         getAdmissions, getAdmission, addAdmission, editAdmission, removeAdmission }
  from '../controllers/contentController.js';

const router = Router();
router.use(authenticate, authorize('admin'));

// Dashboard
router.get('/dashboard/stats',            getDashboardStats);

// Students
router.route('/students')      .get(getStudents).post(addStudent);
router.route('/students/:id')  .get(getStudent).put(editStudent).delete(removeStudent);

// Teachers
router.route('/teachers')      .get(getTeachers).post(addTeacher);
router.route('/teachers/:id')  .get(getTeacher).put(editTeacher).delete(removeTeacher);

// Teacher Assignments
router.get('/teachers/:id/assignments', getAssignments);
router.post('/assignments',             assignTeacher);
router.delete('/assignments/:id',       unassignTeacher);

// Sessions
router.route('/sessions')    .get(getSessions).post(addSession);
router.route('/sessions/:id').get(getSession).put(editSession).delete(removeSession);

// Classes
router.route('/classes')    .get(getClasses).post(addClass);
router.route('/classes/:id').get(getClassItem).put(editClass).delete(removeClass);

// Subjects
router.route('/subjects')    .get(getSubjects).post(addSubject);
router.route('/subjects/:id').get(getSubject).put(editSubject).delete(removeSubject);

// Examinations
router.route('/examinations')    .get(getExams).post(addExam);
router.route('/examinations/:id').get(getExam).put(editExam).delete(removeExam);

// Grade Configuration
router.route('/grades').get(getGrades).put(updateGrades);

// Results
router.get('/results',                adminGetAllResults);
router.patch('/results/:id/action',   adminResultAction);

// Attendance
router.get('/attendance', adminGetAttendance);

// Notices
router.route('/notices')    .get(getAdminNotices).post(addNotice);
router.route('/notices/:id').get(getNotice).put(editNotice).delete(removeNotice);

// Events
router.route('/events')    .get(getPublicEvents).post(addEvent);
router.route('/events/:id').get(getEvent).put(editEvent).delete(removeEvent);

// Gallery
router.route('/gallery')    .get(getPublicGallery).post(addGalleryItem);
router.delete('/gallery/:id', removeGalleryItem);

// Admissions
router.route('/admissions')    .get(getAdmissions).post(addAdmission);
router.route('/admissions/:id').get(getAdmission).put(editAdmission).delete(removeAdmission);

export default router;
