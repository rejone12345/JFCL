// =============================================================================
// validators/studentValidators.js — Zod schemas for student CRUD
// =============================================================================
import { z } from 'zod';

const baseStudent = {
  name:      z.string().min(2, 'Name must be at least 2 characters').trim(),
  roll:      z.string().min(1, 'Roll number is required').trim(),
  class:     z.string().min(1, 'Class is required'),
  section:   z.string().trim().optional().default('A'),
  group:     z.string().optional(),
  gender:    z.enum(['Male', 'Female', 'Other']).optional(),
  contact:   z.string().optional(),
  phone:     z.string().trim().optional(),
  guardian:  z.string().optional(),
  dob:       z.string().optional(),
  email:     z.string().email('Invalid email').optional().or(z.literal('')),
};

export const createStudentSchema = z.object({
  ...baseStudent,
  name:  baseStudent.name,
  roll:  baseStudent.roll,
  class: baseStudent.class,
  email: z.string().email('Valid email is required for Student 2FA OTP').trim().toLowerCase(),
});

export const updateStudentSchema = z.object({
  ...baseStudent,
}).partial();

export const studentSignupSchema = z.object({
  name:            z.string().min(2, 'Name must be at least 2 characters').trim(),
  email:           z.string().email('Invalid email address').trim().toLowerCase(),
  phone:           z.string().trim().optional().default(''),
  class:           z.string().min(1, 'Class is required').trim(),
  section:         z.string().trim().optional().default('A'),
  group:           z.string().trim().optional().default('Science'),
  gender:          z.enum(['Male', 'Female', 'Other']).optional(),
  roll:            z.string().min(1, 'Roll number is required').trim(),
  dob:             z.string().trim().optional().default(''),
  guardianName:    z.string().min(1, "Guardian's name is required").trim(),
  password:        z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});
