// =============================================================================
// services/studentService.js — Student management business logic
// =============================================================================
import {
  getSafeUsers,
  getSafeUser,
  createUser,
  updateUser,
  deleteUser,
  findUserById,
} from '../repositories/userRepository.js';
import { AppError } from '../utils/AppError.js';

export const listStudents = async ({ classFilter, search } = {}) => {
  let students = await getSafeUsers('student');
  if (classFilter && classFilter !== 'All') {
    students = students.filter((s) => s.class === classFilter);
  }
  if (search) {
    const q = search.toLowerCase();
    students = students.filter(
      (s) => s.name?.toLowerCase().includes(q) || s.roll?.includes(search)
    );
  }
  return students;
};

export const getStudentById = async (id) => {
  const s = await getSafeUser(id);
  if (!s || s.role !== 'student') throw new AppError('Student not found.', 404);
  return s;
};

export const createStudent = async (data) => {
  // Generate student ID and activation code
  const newId  = `STU${Date.now()}`;
  const code   = `JFCL-${Math.floor(1000 + Math.random() * 9000)}-${data.roll || 'NEW'}`;
  return createUser({
    ...data,
    id:             newId,
    studentId:      newId,
    role:           'student',
    status:         'active',
    isActivated:    false,
    activationCode: code,
    password:       `Temp@${Date.now()}`, // temporary; student must activate
  });
};

export const updateStudent = async (id, data) => {
  const s = await findUserById(id);
  if (!s || s.role !== 'student') throw new AppError('Student not found.', 404);
  return updateUser(id, data);
};

export const deleteStudent = async (id) => {
  const s = await findUserById(id);
  if (!s || s.role !== 'student') throw new AppError('Student not found.', 404);
  return deleteUser(id);
};
