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
  findStudentByRoll,
  findUserByEmail,
} from '../repositories/userRepository.js';
import { AppError } from '../utils/AppError.js';

export const listStudents = async ({ classFilter, search } = {}) => {
  let students = await getSafeUsers('student', true);
  if (classFilter && classFilter !== 'All') {
    students = students.filter((s) => s.class === classFilter);
  }
  if (search) {
    const q = search.toLowerCase();
    students = students.filter(
      (s) =>
        s.name?.toLowerCase().includes(q) ||
        s.roll?.includes(search) ||
        s.email?.toLowerCase().includes(q) ||
        s.studentId?.toLowerCase().includes(q)
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
  const existingRoll = await findStudentByRoll(data.roll);
  if (existingRoll) {
    throw new AppError('A student with this roll number already exists.', 409);
  }
  if (data.email && data.email.trim()) {
    const existingEmail = await findUserByEmail(data.email.trim());
    if (existingEmail) {
      throw new AppError('An account with this email address already exists.', 409);
    }
  }

  // Generate student ID and activation code
  const newId = `STU${Date.now()}`;
  const code  = `JFCL-${Math.floor(1000 + Math.random() * 9000)}-${data.roll || 'NEW'}`;
  const created = await createUser({
    ...data,
    id:             newId,
    studentId:      newId,
    section:        data.section || 'A',
    group:          data.group || 'General',
    contact:        data.contact || data.phone || '',
    phone:          data.phone || data.contact || '',
    role:           'student',
    status:         'active',
    isActivated:    false,
    activationCode: code,
    password:       `Temp@${Date.now()}`, // temporary; student must activate
  });
  return {
    ...created,
    studentId:      newId,
    activationCode: code,
  };
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
