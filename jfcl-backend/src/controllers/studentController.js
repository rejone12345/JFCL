// =============================================================================
// controllers/studentController.js — Admin student CRUD handlers
// =============================================================================
import { sendSuccess } from '../utils/response.js';
import { createStudentSchema, updateStudentSchema } from '../validators/studentValidators.js';
import {
  listStudents, getStudentById, createStudent, updateStudent, deleteStudent,
} from '../services/studentService.js';

/** GET /api/v1/admin/students */
export const getStudents = async (req, res, next) => {
  try {
    const { class: classFilter, search } = req.query;
    const students = await listStudents({ classFilter, search });
    return sendSuccess(res, { data: students, meta: { total: students.length } });
  } catch (err) { next(err); }
};

/** GET /api/v1/admin/students/:id */
export const getStudent = async (req, res, next) => {
  try {
    const student = await getStudentById(req.params.id);
    return sendSuccess(res, { data: student });
  } catch (err) { next(err); }
};

/** POST /api/v1/admin/students */
export const addStudent = async (req, res, next) => {
  try {
    const body    = createStudentSchema.parse(req.body);
    const student = await createStudent(body);
    return sendSuccess(res, {
      message: `Student ${student.name} added. Activation code: ${student.activationCode ?? '(already activated)'}`,
      data:    student,
      status:  201,
    });
  } catch (err) { next(err); }
};

/** PUT /api/v1/admin/students/:id */
export const editStudent = async (req, res, next) => {
  try {
    const body    = updateStudentSchema.parse(req.body);
    const updated = await updateStudent(req.params.id, body);
    return sendSuccess(res, { message: 'Student updated.', data: updated });
  } catch (err) { next(err); }
};

/** DELETE /api/v1/admin/students/:id */
export const removeStudent = async (req, res, next) => {
  try {
    await deleteStudent(req.params.id);
    return sendSuccess(res, { message: 'Student removed from system.' });
  } catch (err) { next(err); }
};
