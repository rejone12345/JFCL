import mongoose from 'mongoose';

// ── Academic Session ────────────────────────────────────────────────────────
const academicSessionSchema = new mongoose.Schema(
  {
    year: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: String, enum: ['active', 'completed', 'upcoming'], default: 'active' },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);
export const AcademicSession = mongoose.model('AcademicSession', academicSessionSchema);

// ── Class ───────────────────────────────────────────────────────────────────
const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    level: { type: String, enum: ['junior', 'senior', 'college'], default: 'senior' },
    sections: [{ type: String, trim: true }],
    studentsCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);
export const ClassModel = mongoose.model('Class', classSchema);

// ── Subject ─────────────────────────────────────────────────────────────────
const subjectSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    fullMarks: { type: Number, default: 100 },
    passMarks: { type: Number, default: 33 },
    classId: { type: String, required: true },
    components: {
      written: { type: Number, default: 70 },
      mcq: { type: Number, default: 30 },
      practical: { type: Number, default: 0 },
      ca: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);
export const Subject = mongoose.model('Subject', subjectSchema);

// ── Teacher Assignment ──────────────────────────────────────────────────────
const teacherAssignmentSchema = new mongoose.Schema(
  {
    teacherId: { type: String, required: true },
    classId: { type: String, required: true },
    section: { type: String, required: true },
    subjectId: { type: String, required: true },
    sessionId: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);
export const TeacherAssignment = mongoose.model('TeacherAssignment', teacherAssignmentSchema);

// ── Examination ─────────────────────────────────────────────────────────────
const examinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sessionId: { type: String, required: true },
    status: { type: String, enum: ['draft', 'published', 'completed'], default: 'draft' },
    date: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);
export const Examination = mongoose.model('Examination', examinationSchema);

// ── Result Submission ───────────────────────────────────────────────────────
const studentMarkSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  written: { type: Number, default: 0 },
  mcq: { type: Number, default: 0 },
  practical: { type: Number, default: 0 },
  ca: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  grade: { type: String },
  point: { type: Number },
  remarks: { type: String },
});

const resultSubmissionSchema = new mongoose.Schema(
  {
    examId: { type: String, required: true },
    classId: { type: String, required: true },
    section: { type: String, required: true },
    subjectId: { type: String, required: true },
    teacherId: { type: String, required: true },
    status: {
      type: String,
      enum: ['draft', 'submitted', 'approved', 'published'],
      default: 'draft',
    },
    submittedAt: { type: Date },
    approvedAt: { type: Date },
    publishedAt: { type: Date },
    adminNote: { type: String, default: null },
    marks: [studentMarkSchema],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);
export const ResultSubmission = mongoose.model('ResultSubmission', resultSubmissionSchema);

// ── Attendance ──────────────────────────────────────────────────────────────
const studentAttendanceRecordSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  status: { type: String, enum: ['present', 'late', 'absent'], default: 'present' },
});

const attendanceSchema = new mongoose.Schema(
  {
    classId: { type: String, required: true },
    section: { type: String, required: true },
    date: { type: String, required: true },
    teacherId: { type: String, required: true },
    records: [studentAttendanceRecordSchema],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);
export const Attendance = mongoose.model('Attendance', attendanceSchema);

// ── Content Models: Notice, Event, Gallery, Admission ────────────────────────
const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String, default: () => new Date().toISOString().split('T')[0] },
    category: { type: String, default: 'General' },
    priority: { type: String, enum: ['high', 'medium', 'normal'], default: 'normal' },
    content: { type: String, required: true },
    isPublic: { type: Boolean, default: true },
    createdBy: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);
export const Notice = mongoose.model('Notice', noticeSchema);

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String },
    location: { type: String },
    description: { type: String },
    category: { type: String, default: 'General' },
    isPublic: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);
export const EventModel = mongoose.model('Event', eventSchema);

const admissionSchema = new mongoose.Schema(
  {
    applicantName: { type: String, required: true },
    appliedClass: { type: String, required: true },
    guardianName: { type: String, required: true },
    contact: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    date: { type: String, default: () => new Date().toISOString().split('T')[0] },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);
export const Admission = mongoose.model('Admission', admissionSchema);
