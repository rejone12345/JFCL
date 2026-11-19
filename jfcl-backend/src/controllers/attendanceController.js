// =============================================================================
// controllers/attendanceController.js — Attendance CRUD handlers
// =============================================================================
import { sendSuccess } from '../utils/response.js';
import {
  getAttendanceByClassAndDate,
  getAttendanceSummaryForStudent,
  saveAttendance,
  getAllAttendance,
} from '../repositories/attendanceRepository.js';
import { AppError } from '../utils/AppError.js';

/** GET /api/v1/admin/attendance */
export const adminGetAttendance = (req, res, next) => {
  try {
    return sendSuccess(res, { data: getAllAttendance() });
  } catch (err) { next(err); }
};

/** GET /api/v1/teacher/attendance?classId=&section=&date= */
export const teacherGetAttendance = (req, res, next) => {
  try {
    const { classId, section, date } = req.query;
    if (!classId || !section || !date) throw new AppError('classId, section and date are required.', 400);
    const record = getAttendanceByClassAndDate(classId, section, date);
    return sendSuccess(res, { data: record || { classId, section, date, records: [] } });
  } catch (err) { next(err); }
};

/** POST /api/v1/teacher/attendance */
export const teacherSaveAttendance = (req, res, next) => {
  try {
    const { classId, section, date, records } = req.body;
    if (!classId || !section || !date || !Array.isArray(records)) {
      throw new AppError('classId, section, date and records[] are required.', 400);
    }
    const saved = saveAttendance({ classId, section, date, teacherId: req.user.id, records });
    return sendSuccess(res, { message: 'Attendance saved.', data: saved });
  } catch (err) { next(err); }
};

/** GET /api/v1/student/attendance */
export const studentGetAttendance = (req, res, next) => {
  try {
    const summary = getAttendanceSummaryForStudent(req.user.id);
    return sendSuccess(res, { data: summary });
  } catch (err) { next(err); }
};
