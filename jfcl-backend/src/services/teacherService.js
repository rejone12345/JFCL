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
  // Pass true to include activationCode so admin can distribute it
  let teachers = await getSafeUsers('teacher', true);
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
  const code  = `JFCL-TCH-${Math.floor(1000 + Math.random() * 9000)}`;
  const created = await createUser({
    ...data,
    id:             newId,
    teacherId:      newId,
    role:           'teacher',
    status:         'active',
    isActivated:    false,
    activationCode: code,
    password:       `Temp@${Date.now()}`, // Temporary password; teacher must activate
  });
  return {
    ...created,
    teacherId: newId,
    activationCode: code,
  };
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
