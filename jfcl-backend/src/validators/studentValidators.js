// =============================================================================
// validators/studentValidators.js — Zod schemas for student CRUD
// =============================================================================
import { z } from 'zod';

const baseStudent = {
  name:      z.string().min(2, 'Name must be at least 2 characters').trim(),
  roll:      z.string().min(1, 'Roll number is required').trim(),
  class:     z.string().min(1, 'Class is required'),
  section:   z.string().min(1, 'Section is required'),
  group:     z.string().optional(),
  gender:    z.enum(['Male', 'Female', 'Other']).optional(),
  contact:   z.string().optional(),
  guardian:  z.string().optional(),
  dob:       z.string().optional(),
  email:     z.string().email('Invalid email').optional().or(z.literal('')),
};

export const createStudentSchema = z.object({
  ...baseStudent,
  name:  baseStudent.name,
  roll:  baseStudent.roll,
  class: baseStudent.class,
});

export const updateStudentSchema = z.object({
  ...baseStudent,
}).partial();

export const studentSignupSchema = z.object({
  name:          z.string().min(2).trim(),
  email:         z.string().email('Invalid email').trim(),
  phone:         z.string().optional(),
  class:         z.string().min(1),
  roll:          z.string().min(1),
  dob:           z.string().optional(),
  guardianName:  z.string().min(1),
  password:      z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});
