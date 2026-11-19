// =============================================================================
// services/teacherService.js — Teacher management business logic
// =============================================================================
import {
  getSafeUsers,
  getSafeUser,
  createUser,
  updateUser,
  deleteUser,
  findUserById,
} from '../repositories/userRepository.js';
import {
  getAssignmentsByTeacher,
  getAllAssignments,
  createAssignment,
  deleteAssignment,
} from '../repositories/academicRepository.js';
import { AppError } from '../utils/AppError.js';

export const listTeachers = async ({ search } = {}) => {
  let teachers = await getSafeUsers('teacher');
  if (search) {
    const q = search.toLowerCase();
    teachers = teachers.filter(
      (t) => t.name?.toLowerCase().includes(q) || t.department?.toLowerCase().includes(q)
    );
  }
  return teachers;
};

export const getTeacherById = async (id) => {
  const t = await getSafeUser(id);
  if (!t || t.role !== 'teacher') throw new AppError('Teacher not found.', 404);
  return t;
};

export const createTeacher = async (data) => {
  const newId = `TCH${Date.now()}`;
  return createUser({
    ...data,
    id:        newId,
    teacherId: newId,
    role:      'teacher',
    status:    'active',
    password:  'Teacher@Temp1234', // admin must set through proper channel
  });
};

export const updateTeacher = async (id, data) => {
  const t = await findUserById(id);
  if (!t || t.role !== 'teacher') throw new AppError('Teacher not found.', 404);
  return updateUser(id, data);
};

export const deleteTeacher = async (id) => {
  const t = await findUserById(id);
  if (!t || t.role !== 'teacher') throw new AppError('Teacher not found.', 404);
  return deleteUser(id);
};

// ── Teacher Assignments ──────────────────────────────────────────────────────

export const getTeacherAssignments = (teacherId) => {
  return getAssignmentsByTeacher(teacherId);
};

export const addTeacherAssignment = (data) => {
  return createAssignment(data);
};

export const removeTeacherAssignment = (assignmentId) => {
  const ok = deleteAssignment(assignmentId);
  if (!ok) throw new AppError('Assignment not found.', 404);
  return true;
};
