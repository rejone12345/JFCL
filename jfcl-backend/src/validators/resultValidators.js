// =============================================================================
// validators/resultValidators.js — Zod schemas for marks entry and results
// =============================================================================
import { z } from 'zod';

const markComponent = z.number({ coerce: true }).min(0, 'Marks cannot be negative');

const markRowSchema = z.object({
  studentId: z.string().min(1),
  written:   markComponent.optional().default(0),
  mcq:       markComponent.optional().default(0),
  practical: markComponent.optional().default(0),
  ca:        markComponent.optional().default(0),
});

export const marksEntrySchema = z.object({
  examId:    z.string().min(1, 'Exam is required'),
  classId:   z.string().min(1, 'Class is required'),
  section:   z.string().min(1, 'Section is required'),
  subjectId: z.string().min(1, 'Subject is required'),
  marks:     z.array(markRowSchema).min(1, 'At least one mark entry is required'),
});

export const submitMarksSchema = z.object({
  submissionId: z.string().min(1, 'Submission ID is required'),
});

export const resultActionSchema = z.object({
  submissionId: z.string().min(1),
  action:       z.enum(['approve', 'publish', 'return'], {
    errorMap: () => ({ message: 'Action must be approve, publish, or return' }),
  }),
  adminNote:    z.string().optional(),
});

export const publicResultSearchSchema = z.object({
  roll:   z.string().min(1, 'Roll number is required'),
  examId: z.string().min(1, 'Examination is required'),
});
