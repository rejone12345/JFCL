// =============================================================================
// data/seedData.js — Temporary in-memory demo data for all collections
// =============================================================================
// ⚠ WARNING: ALL DATA BELOW IS FICTIONAL DEMO DATA.
// - It exists only in memory while the server is running.
// - It is LOST on every server restart.
// - Student / teacher names and contact numbers are entirely invented.
// - This data must NEVER be used for real institutional records.
// =============================================================================

// ── ACADEMIC SESSIONS ──────────────────────────────────────────────────────
export const sessions = [
  { id: 'SES2024', year: '2024', name: 'Academic Session 2024', status: 'completed' },
  { id: 'SES2025', year: '2025', name: 'Academic Session 2025', status: 'completed' },
  { id: 'SES2026', year: '2026', name: 'Academic Session 2026', status: 'active'    },
];

// ── CLASSES ────────────────────────────────────────────────────────────────
export const classes = [
  { id: 'CLS06', name: 'Class 6',        level: 'junior',  sections: ['A', 'B'],                                          studentsCount: 160 },
  { id: 'CLS07', name: 'Class 7',        level: 'junior',  sections: ['A', 'B'],                                          studentsCount: 155 },
  { id: 'CLS08', name: 'Class 8',        level: 'junior',  sections: ['A', 'B'],                                          studentsCount: 165 },
  { id: 'CLS09', name: 'Class 9',        level: 'senior',  sections: ['Science A', 'Science B', 'Business', 'Humanities'], studentsCount: 220 },
  { id: 'CLS10', name: 'Class 10',       level: 'senior',  sections: ['Science A', 'Science B', 'Business', 'Humanities'], studentsCount: 210 },
  { id: 'CLS11', name: 'Class 11 (HSC)', level: 'college', sections: ['Science', 'Commerce', 'Arts'],                     studentsCount: 260 },
  { id: 'CLS12', name: 'Class 12 (HSC)', level: 'college', sections: ['Science', 'Commerce', 'Arts'],                     studentsCount: 250 },
];

// ── SUBJECTS ───────────────────────────────────────────────────────────────
export const subjects = [
  { id: 'SUB101', code: '101', name: 'Bangla 1st Paper',           fullMarks: 100, passMarks: 33, classId: 'CLS10', components: { written: 70, mcq: 30, practical: 0,  ca: 0 } },
  { id: 'SUB102', code: '102', name: 'Bangla 2nd Paper',           fullMarks: 100, passMarks: 33, classId: 'CLS10', components: { written: 70, mcq: 30, practical: 0,  ca: 0 } },
  { id: 'SUB107', code: '107', name: 'English 1st Paper',          fullMarks: 100, passMarks: 33, classId: 'CLS10', components: { written: 100, mcq: 0, practical: 0,  ca: 0 } },
  { id: 'SUB108', code: '108', name: 'English 2nd Paper',          fullMarks: 100, passMarks: 33, classId: 'CLS10', components: { written: 100, mcq: 0, practical: 0,  ca: 0 } },
  { id: 'SUB109', code: '109', name: 'Mathematics',                fullMarks: 100, passMarks: 33, classId: 'CLS10', components: { written: 70, mcq: 30, practical: 0,  ca: 0 } },
  { id: 'SUB136', code: '136', name: 'Physics',                    fullMarks: 100, passMarks: 33, classId: 'CLS10', components: { written: 50, mcq: 25, practical: 25, ca: 0 } },
  { id: 'SUB137', code: '137', name: 'Chemistry',                  fullMarks: 100, passMarks: 33, classId: 'CLS10', components: { written: 50, mcq: 25, practical: 25, ca: 0 } },
  { id: 'SUB138', code: '138', name: 'Biology',                    fullMarks: 100, passMarks: 33, classId: 'CLS10', components: { written: 50, mcq: 25, practical: 25, ca: 0 } },
  { id: 'SUB154', code: '154', name: 'Information & Comm. Tech',   fullMarks: 50,  passMarks: 17, classId: 'CLS10', components: { written: 20, mcq: 20, practical: 10, ca: 0 } },
];

// ── TEACHER ASSIGNMENTS ────────────────────────────────────────────────────
export const teacherAssignments = [
  { id: 'ASSIGN001', teacherId: 'TCH004', classId: 'CLS10', section: 'A', subjectId: 'SUB136', sessionId: 'SES2026' },
  { id: 'ASSIGN002', teacherId: 'TCH005', classId: 'CLS10', section: 'A', subjectId: 'SUB137', sessionId: 'SES2026' },
  { id: 'ASSIGN003', teacherId: 'TCH006', classId: 'CLS10', section: 'A', subjectId: 'SUB138', sessionId: 'SES2026' },
  { id: 'ASSIGN004', teacherId: 'TCH003', classId: 'CLS10', section: 'A', subjectId: 'SUB109', sessionId: 'SES2026' },
  { id: 'ASSIGN005', teacherId: 'TCH004', classId: 'CLS09', section: 'Science A', subjectId: 'SUB136', sessionId: 'SES2026' },
];

// ── EXAMINATIONS ───────────────────────────────────────────────────────────
export const examinations = [
  { id: 'EX2025_ANNUAL', name: 'Annual Examination 2025',      sessionId: 'SES2025', status: 'published', date: '2025-11-20', createdAt: '2025-10-01' },
  { id: 'EX2026_TEST',   name: 'SSC Test Examination 2026',    sessionId: 'SES2026', status: 'published', date: '2026-01-15', createdAt: '2025-12-01' },
  { id: 'EX2026_MID',    name: 'Half-Yearly Examination 2026', sessionId: 'SES2026', status: 'draft',     date: '2026-06-10', createdAt: '2026-05-01' },
];

// ── GRADE CONFIGURATION ─────────────────────────────────────────────────────
export const gradeConfig = [
  { min: 80, max: 100, grade: 'A+', point: 5.0, remarks: 'Outstanding'   },
  { min: 70, max: 79,  grade: 'A',  point: 4.0, remarks: 'Excellent'     },
  { min: 60, max: 69,  grade: 'A-', point: 3.5, remarks: 'Very Good'     },
  { min: 50, max: 59,  grade: 'B',  point: 3.0, remarks: 'Good'          },
  { min: 40, max: 49,  grade: 'C',  point: 2.0, remarks: 'Satisfactory'  },
  { min: 33, max: 39,  grade: 'D',  point: 1.0, remarks: 'Pass'          },
  { min: 0,  max: 32,  grade: 'F',  point: 0.0, remarks: 'Fail'          },
];

// ── RESULT SUBMISSIONS (Draft → Submitted → Approved → Published) ──────────
export const resultSubmissions = [
  {
    id:        'RSUB001',
    examId:    'EX2025_ANNUAL',
    classId:   'CLS10',
    section:   'A',
    subjectId: 'SUB136',
    teacherId: 'TCH004',
    status:    'published',
    submittedAt: '2025-11-25',
    approvedAt:  '2025-11-27',
    publishedAt: '2025-11-28',
    adminNote:   null,
    marks: [
      { studentId: 'STU1001', written: 46, mcq: 22, practical: 24, ca: 0 },
      { studentId: 'STU1002', written: 44, mcq: 21, practical: 23, ca: 0 },
      { studentId: 'STU1003', written: 40, mcq: 20, practical: 20, ca: 0 },
      { studentId: 'STU1004', written: 38, mcq: 18, practical: 19, ca: 0 },
      { studentId: 'STU1005', written: 32, mcq: 16, practical: 18, ca: 0 },
    ],
  },
  {
    id:        'RSUB002',
    examId:    'EX2025_ANNUAL',
    classId:   'CLS10',
    section:   'A',
    subjectId: 'SUB109',
    teacherId: 'TCH003',
    status:    'published',
    submittedAt: '2025-11-26',
    approvedAt:  '2025-11-28',
    publishedAt: '2025-11-29',
    adminNote:   null,
    marks: [
      { studentId: 'STU1001', written: 68, mcq: 28, practical: 0, ca: 0 },
      { studentId: 'STU1002', written: 60, mcq: 24, practical: 0, ca: 0 },
      { studentId: 'STU1003', written: 52, mcq: 20, practical: 0, ca: 0 },
      { studentId: 'STU1004', written: 44, mcq: 18, practical: 0, ca: 0 },
      { studentId: 'STU1005', written: 35, mcq: 15, practical: 0, ca: 0 },
    ],
  },
  {
    id:        'RSUB003',
    examId:    'EX2026_TEST',
    classId:   'CLS10',
    section:   'A',
    subjectId: 'SUB137',
    teacherId: 'TCH005',
    status:    'submitted',
    submittedAt: '2026-01-20',
    approvedAt:  null,
    publishedAt: null,
    adminNote:   null,
    marks: [
      { studentId: 'STU1001', written: 45, mcq: 21, practical: 23, ca: 0 },
      { studentId: 'STU1002', written: 42, mcq: 20, practical: 21, ca: 0 },
      { studentId: 'STU1003', written: 36, mcq: 17, practical: 18, ca: 0 },
    ],
  },
  {
    id:        'RSUB004',
    examId:    'EX2026_MID',
    classId:   'CLS10',
    section:   'A',
    subjectId: 'SUB138',
    teacherId: 'TCH006',
    status:    'draft',
    submittedAt: null,
    approvedAt:  null,
    publishedAt: null,
    adminNote:   null,
    marks: [],
  },
];

// ── ATTENDANCE RECORDS ─────────────────────────────────────────────────────
export const attendanceRecords = [
  // date: 2026-11-19 (Class 10, Section A)
  { id: 'ATT001', classId: 'CLS10', section: 'A', date: '2026-11-19', teacherId: 'TCH004',
    records: [
      { studentId: 'STU1001', status: 'present' },
      { studentId: 'STU1002', status: 'present' },
      { studentId: 'STU1003', status: 'late'    },
      { studentId: 'STU1004', status: 'present' },
      { studentId: 'STU1005', status: 'absent'  },
    ]
  },
  { id: 'ATT002', classId: 'CLS10', section: 'A', date: '2026-11-18', teacherId: 'TCH004',
    records: [
      { studentId: 'STU1001', status: 'present' },
      { studentId: 'STU1002', status: 'present' },
      { studentId: 'STU1003', status: 'present' },
      { studentId: 'STU1004', status: 'absent'  },
      { studentId: 'STU1005', status: 'present' },
    ]
  },
];

// ── NOTICES ────────────────────────────────────────────────────────────────
export const notices = [
  {
    id: 'NOT01', title: 'Admit Card Distribution for SSC Examination 2026',
    date: '2026-11-15', category: 'Exam', priority: 'high',
    content: 'Admit cards for upcoming examinations can be collected from the institutional accounts office between 10:00 AM and 2:00 PM on all working days.',
    isPublic: true, createdBy: 'ADM001',
  },
  {
    id: 'NOT02', title: 'Schedule of Annual Sports & Cultural Meet 2026',
    date: '2026-11-10', category: 'Events', priority: 'medium',
    content: 'Annual sports competition will be held at our institutional campus playground from December 1st to December 3rd.',
    isPublic: true, createdBy: 'ADM001',
  },
  {
    id: 'NOT03', title: 'Class 11 (HSC) Admission Circular 2026-2027',
    date: '2026-11-05', category: 'Admission', priority: 'high',
    content: 'Online applications are invited for Class 11 admission across Science, Business Studies and Humanities groups.',
    isPublic: true, createdBy: 'ADM001',
  },
  {
    id: 'NOT04', title: 'Parent-Teacher Meeting for Class 9 and 10',
    date: '2026-10-28', category: 'Academic', priority: 'normal',
    content: 'All guardians of Class 9 and 10 students are cordially invited to attend the quarterly review meeting this Saturday.',
    isPublic: true, createdBy: 'ADM001',
  },
  {
    id: 'NOT05', title: 'Internal Exam Result Processing Guidelines for Teachers',
    date: '2026-11-01', category: 'Internal', priority: 'high',
    content: 'Teachers must submit all marks entries within 7 days of exam completion. Late submissions require a written explanation addressed to the Principal.',
    isPublic: false, createdBy: 'ADM001',
  },
];

// ── EVENTS ─────────────────────────────────────────────────────────────────
export const events = [
  {
    id: 'EV01', title: 'Annual Science Fair 2026',
    date: '2026-12-15', time: '09:00 AM - 04:00 PM',
    location: 'Main Auditorium',
    description: 'Over 60 innovative student projects from junior and senior science clubs will be showcased.',
    category: 'Academic', isPublic: true,
  },
  {
    id: 'EV02', title: 'Inter-College Debate Championship',
    date: '2026-12-20', time: '10:00 AM - 05:00 PM',
    location: 'College Seminar Hall',
    description: 'JFCL Debate Club will host 16 regional collegiate institutions in parliamentary debate.',
    category: 'Competition', isPublic: true,
  },
  {
    id: 'EV03', title: 'Victory Day Commemoration & Cultural Program',
    date: '2026-12-16', time: '08:30 AM',
    location: 'Campus Grounds',
    description: 'Flag hoisting ceremony followed by patriotic songs, recitations and drama presented by students.',
    category: 'Cultural', isPublic: true,
  },
];

// ── GALLERY ─────────────────────────────────────────────────────────────────
export const gallery = [
  { id: 'GAL001', title: 'Annual Prize Giving Ceremony 2025', category: 'Ceremony', date: '2025-12-10', url: 'https://placehold.co/400x300?text=Prize+Ceremony' },
  { id: 'GAL002', title: 'Science Lab - Physics Experiment',  category: 'Academic',  date: '2026-09-15', url: 'https://placehold.co/400x300?text=Physics+Lab' },
  { id: 'GAL003', title: 'Sports Day 2026 — Opening Ceremony', category: 'Sports',  date: '2026-11-01', url: 'https://placehold.co/400x300?text=Sports+Day' },
];

// ── ADMISSIONS ──────────────────────────────────────────────────────────────
export const admissions = [
  { id: 'ADM202601', applicantName: 'Siam Mahmud',    appliedClass: 'Class 6',              guardianName: 'Mahmud Hasan',   contact: '01811223344', status: 'approved',  date: '2026-11-12' },
  { id: 'ADM202602', applicantName: 'Farhana Akter',  appliedClass: 'Class 11 (Science)',   guardianName: 'Nurul Amin',     contact: '01911223355', status: 'pending',   date: '2026-11-14' },
  { id: 'ADM202603', applicantName: 'Kawsar Ahmed',   appliedClass: 'Class 9 (Science)',    guardianName: 'Jahangir Alam',  contact: '01611223366', status: 'approved',  date: '2026-11-15' },
  { id: 'ADM202604', applicantName: 'Mariya Sultana', appliedClass: 'Class 11 (Commerce)',  guardianName: 'Rezaul Karim',   contact: '01711223377', status: 'rejected',  date: '2026-11-16' },
];

// ── INSTITUTIONAL STATS (pre-computed summary) ──────────────────────────────
export const institutionStats = {
  totalStudents:   1420,
  totalTeachers:   68,
  totalClasses:    12,
  activeNotices:   5,
  passRate:        '98.6%',
  gpa5Count:       312,
  pendingAdmissions: 1,
};
