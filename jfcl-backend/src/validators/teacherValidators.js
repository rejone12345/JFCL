// =============================================================================
// validators/teacherValidators.js — Zod schemas for teacher CRUD
// =============================================================================
import { z } from 'zod';

const base = {
  name:          z.string().min(2, 'Name must be at least 2 characters').trim(),
  designation:   z.string().min(1, 'Designation is required').trim(),
  department:    z.string().min(1, 'Department is required'),
  email:         z.string().email('Invalid email').trim(),
  phone:         z.string().optional(),
  qualification: z.string().optional(),
};

export const createTeacherSchema = z.object({ ...base });
export const updateTeacherSchema = z.object({ ...base }).partial();

export const assignTeacherSchema = z.object({
  teacherId:  z.string().min(1),
  classId:    z.string().min(1),
  section:    z.string().min(1),
  subjectId:  z.string().min(1),
  sessionId:  z.string().min(1),
});
