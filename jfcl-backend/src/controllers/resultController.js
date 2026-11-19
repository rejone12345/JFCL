// =============================================================================
// controllers/resultController.js — Marks entry, result workflow, public search
// =============================================================================
import { sendSuccess } from '../utils/response.js';
import { marksEntrySchema, resultActionSchema, publicResultSearchSchema } from '../validators/resultValidators.js';
import {
  listAllSubmissions,
  listTeacherSubmissions,
  getOrCreateDraft,
  saveMarks,
  submitMarksForApproval,
  adminApproveSubmission,
  adminPublishSubmission,
  adminReturnForCorrection,
  getStudentResults,
  getPublicResultByRoll,
} from '../services/resultService.js';

// ── Admin ────────────────────────────────────────────────────────────────────

/** GET /api/v1/admin/results */
export const adminGetAllResults = (req, res, next) => {
  try {
    return sendSuccess(res, { data: listAllSubmissions() });
  } catch (err) { next(err); }
};

/** PATCH /api/v1/admin/results/:id/action */
export const adminResultAction = (req, res, next) => {
  try {
    const { action, adminNote } = resultActionSchema.parse({
      submissionId: req.params.id,
      action: req.body.action,
      adminNote: req.body.adminNote,
    });
    let result;
    if (action === 'approve') {
      result = adminApproveSubmission(req.user.id, req.params.id, adminNote);
    } else if (action === 'publish') {
      result = adminPublishSubmission(req.params.id);
    } else {
      result = adminReturnForCorrection(req.params.id, adminNote);
    }
    return sendSuccess(res, { message: `Result ${action}d successfully.`, data: result });
  } catch (err) { next(err); }
};

// ── Teacher ──────────────────────────────────────────────────────────────────

/** GET /api/v1/teacher/results */
export const teacherGetResults = (req, res, next) => {
  try {
    return sendSuccess(res, { data: listTeacherSubmissions(req.user.id) });
  } catch (err) { next(err); }
};

/** POST /api/v1/teacher/marks/draft */
export const getOrCreateMarksDraft = (req, res, next) => {
  try {
    const { examId, classId, section, subjectId } = req.body;
    const draft = getOrCreateDraft(req.user.id, { examId, classId, section, subjectId });
    return sendSuccess(res, { data: draft });
  } catch (err) { next(err); }
};

/** PUT /api/v1/teacher/marks/:submissionId */
export const saveMarksEntry = async (req, res, next) => {
  try {
    const { marks } = req.body;
    const result = await saveMarks(req.user.id, req.params.submissionId, marks || []);
    return sendSuccess(res, { message: 'Marks saved as draft.', data: result });
  } catch (err) { next(err); }
};

/** POST /api/v1/teacher/marks/:submissionId/submit */
export const submitMarks = (req, res, next) => {
  try {
    const result = submitMarksForApproval(req.user.id, req.params.submissionId);
    return sendSuccess(res, { message: 'Marks submitted for administrative approval.', data: result });
  } catch (err) { next(err); }
};

// ── Student ──────────────────────────────────────────────────────────────────

/** GET /api/v1/student/results?examId=... */
export const studentGetResults = (req, res, next) => {
  try {
    const result = getStudentResults(req.user.id, req.query.examId);
    return sendSuccess(res, { data: result });
  } catch (err) { next(err); }
};

// ── Public ───────────────────────────────────────────────────────────────────

/** GET /api/v1/public/results?roll=...&examId=... */
export const publicResultSearch = async (req, res, next) => {
  try {
    const { roll, examId } = publicResultSearchSchema.parse(req.query);
    const result = await getPublicResultByRoll(roll, examId);
    return sendSuccess(res, { data: result });
  } catch (err) { next(err); }
};
