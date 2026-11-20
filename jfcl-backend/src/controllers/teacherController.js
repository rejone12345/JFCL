// =============================================================================
// controllers/teacherController.js — Admin teacher management + assignments
// =============================================================================
import { sendSuccess } from '../utils/response.js';
import { createTeacherSchema, updateTeacherSchema, assignTeacherSchema } from '../validators/teacherValidators.js';
import {
  listTeachers, getTeacherById, createTeacher, updateTeacher, deleteTeacher,
  getTeacherAssignments, addTeacherAssignment, removeTeacherAssignment,
} from '../services/teacherService.js';
import { getSafeUser } from '../repositories/userRepository.js';
import { getAssignmentsByTeacher } from '../repositories/academicRepository.js';
import { AppError } from '../utils/AppError.js';

/** GET /api/v1/admin/teachers */
export const getTeachers = async (req, res, next) => {
  try {
    const teachers = await listTeachers({ search: req.query.search });
    return sendSuccess(res, { data: teachers, meta: { total: teachers.length } });
  } catch (err) { next(err); }
};

/** GET /api/v1/admin/teachers/:id */
export const getTeacher = async (req, res, next) => {
  try {
    const teacher = await getTeacherById(req.params.id);
    return sendSuccess(res, { data: teacher });
  } catch (err) { next(err); }
};

/** POST /api/v1/admin/teachers */
export const addTeacher = async (req, res, next) => {
  try {
    const body    = createTeacherSchema.parse(req.body);
    const teacher = await createTeacher(body);
    return sendSuccess(res, {
      message: `Teacher ${teacher.name} created. Activation code: ${teacher.activationCode || 'Generated'}`,
      data: teacher,
      status: 201,
    });
  } catch (err) { next(err); }
};

/** PUT /api/v1/admin/teachers/:id */
export const editTeacher = async (req, res, next) => {
  try {
    const body    = updateTeacherSchema.parse(req.body);
    const updated = await updateTeacher(req.params.id, body);
    return sendSuccess(res, { message: 'Teacher updated.', data: updated });
  } catch (err) { next(err); }
};

/** DELETE /api/v1/admin/teachers/:id */
export const removeTeacher = async (req, res, next) => {
  try {
    await deleteTeacher(req.params.id);
    return sendSuccess(res, { message: 'Teacher removed.' });
  } catch (err) { next(err); }
};

/** GET /api/v1/admin/teachers/:id/assignments */
export const getAssignments = (req, res, next) => {
  try {
    return sendSuccess(res, { data: getTeacherAssignments(req.params.id) });
  } catch (err) { next(err); }
};

/** POST /api/v1/admin/teachers/assign */
export const assignTeacher = (req, res, next) => {
  try {
    const body = assignTeacherSchema.parse(req.body);
    const a    = addTeacherAssignment(body);
    return sendSuccess(res, { message: 'Teacher assigned.', data: a, status: 201 });
  } catch (err) { next(err); }
};

/** DELETE /api/v1/admin/teachers/assign/:id */
export const unassignTeacher = (req, res, next) => {
  try {
    removeTeacherAssignment(req.params.id);
    return sendSuccess(res, { message: 'Assignment removed.' });
  } catch (err) { next(err); }
};

// ── Teacher portal: own profile + assignments ──────────────────────────────

/** GET /api/v1/teacher/profile */
export const getOwnProfile = async (req, res, next) => {
  try {
    const profile = await getSafeUser(req.user.id);
    if (!profile) throw new AppError('Profile not found.', 404);
    return sendSuccess(res, { data: profile });
  } catch (err) { next(err); }
};

/** GET /api/v1/teacher/assignments */
export const getOwnAssignments = (req, res, next) => {
  try {
    return sendSuccess(res, { data: getAssignmentsByTeacher(req.user.id) });
  } catch (err) { next(err); }
};
