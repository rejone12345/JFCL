// =============================================================================
// controllers/studentPortalController.js — Student self-service portal
// Students can ONLY access their own data. Privacy is enforced here.
// =============================================================================
import { sendSuccess } from '../utils/response.js';
import { getSafeUser } from '../repositories/userRepository.js';
import { AppError } from '../utils/AppError.js';
import { getAttendanceSummaryForStudent } from '../repositories/attendanceRepository.js';
import { getAllNotices, getNoticeById } from '../repositories/contentRepository.js';
import { getAllExaminations } from '../repositories/academicRepository.js';
import { getStudentResults } from '../services/resultService.js';

/** GET /api/v1/student/profile */
export const getOwnProfile = async (req, res, next) => {
  try {
    const profile = await getSafeUser(req.user.id);
    if (!profile) throw new AppError('Profile not found.', 404);
    return sendSuccess(res, { data: profile });
  } catch (err) { next(err); }
};

/** GET /api/v1/student/attendance */
export { studentGetAttendance } from './attendanceController.js';

/** GET /api/v1/student/results?examId= */
export const getOwnResults = (req, res, next) => {
  try {
    // Privacy: use req.user.id from JWT, not from query params
    const result = getStudentResults(req.user.id, req.query.examId);
    return sendSuccess(res, { data: result });
  } catch (err) { next(err); }
};

/** GET /api/v1/student/notices */
export const getOwnNotices = (req, res, next) => {
  try {
    return sendSuccess(res, { data: getAllNotices(true) });
  } catch (err) { next(err); }
};

/** GET /api/v1/student/notices/:id */
export const getNoticeForStudent = (req, res, next) => {
  try {
    const n = getNoticeById(req.params.id);
    if (!n || !n.isPublic) throw new AppError('Notice not found.', 404);
    return sendSuccess(res, { data: n });
  } catch (err) { next(err); }
};

/** GET /api/v1/student/academics */
export const getOwnAcademics = async (req, res, next) => {
  try {
    const student = await getSafeUser(req.user.id);
    if (!student) throw new AppError('Student not found.', 404);
    const exams   = getAllExaminations().filter((e) => e.status === 'published');
    return sendSuccess(res, {
      data: {
        class:    student.class,
        section:  student.section,
        group:    student.group,
        session:  '2026',
        examinations: exams,
      },
    });
  } catch (err) { next(err); }
};
