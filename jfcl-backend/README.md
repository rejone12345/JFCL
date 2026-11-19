# JFCL School & College — Phase 1 Backend Development Documentation

## 1. Project Overview & Architectural Summary
The JFCL Backend provides an enterprise-ready, modular Express REST API designed for the JFCL School & College Management System.
In accordance with **Phase 1 specifications**:
- **Temporary In-Memory Storage**: Built on modular in-memory repositories pre-seeded with realistic institutional demo data.
- **No Database Dependency**: MongoDB Atlas and Mongoose will be introduced in Phase 2 without altering controllers, routing, or services.
- **Strict Data Notice**: Temporary data is maintained only in process memory and disappears entirely whenever the server restarts. It must never be used for actual institutional records.

---

## 2. Directory & Architectural Layout

```
jfcl-backend/
├── .env.example              # Sample environment template
├── .env                      # Active local development configuration
├── .gitignore
├── package.json
└── src/
    ├── app.js                # Express app configuration & middleware pipeline
    ├── server.js             # Process initialization & seed loading
    ├── config/
    │   ├── env.js            # Centralized environment variable validation
    │   └── corsOptions.js    # CORS policy configuration
    ├── controllers/
    │   ├── academicController.js
    │   ├── attendanceController.js
    │   ├── authController.js
    │   ├── contentController.js
    │   ├── resultController.js
    │   ├── studentController.js
    │   ├── studentPortalController.js
    │   └── teacherController.js
    ├── data/
    │   ├── seedData.js       # Temporary demo data (classes, subjects, exams, results, notices)
    │   └── seedUsers.js      # Demo users with auto-hashed bcrypt credentials
    ├── middleware/
    │   ├── auth.js           # JWT verification & RBAC authorization middleware
    │   ├── errorHandler.js   # Centralized error handler & 404 handler
    │   └── rateLimiter.js    # Express rate limiters (general & auth-specific)
    ├── repositories/
    │   ├── academicRepository.js
    │   ├── attendanceRepository.js
    │   ├── contentRepository.js
    │   ├── resultRepository.js
    │   └── userRepository.js
    ├── routes/
    │   ├── index.js          # Main router mounted at /api/v1
    │   ├── admin.routes.js
    │   ├── auth.routes.js
    │   ├── public.routes.js
    │   ├── student.routes.js
    │   └── teacher.routes.js
    ├── services/
    │   ├── authService.js
    │   ├── resultService.js
    │   ├── studentService.js
    │   └── teacherService.js
    ├── utils/
    │   ├── AppError.js       # Operational application error abstraction
    │   ├── gradeCalculator.js# Bangladesh SSC/HSC grading, GPA and totals logic
    │   ├── jwt.js            # JWT signing and verification helpers
    │   ├── marksValidator.js # Component marks validator
    │   └── response.js       # Standardized response envelopes
    └── tests/
        └── runTests.js       # Automated integration test suite
```

---

## 3. Seed Demo Credentials

| Role | Identifier (Email / ID / Roll) | Password | Status / Notes |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@jfcl.edu.bd` or `admin` | `Admin@1234` | Institutional Administrator |
| **Teacher** | `TCH004` or `shamsun@jfcl.edu.bd` | `Teacher@1234` | Senior Teacher (Physics) |
| **Teacher** | `TCH003` or `nazrul@jfcl.edu.bd` | `Teacher@1234` | Senior Teacher (Mathematics) |
| **Student** | Roll `101` or `rahim.101@student.jfcl.edu.bd` | `Student@1234` | Class 10 (Science), Active |
| **Student** | Roll `102` or `nusrat.102@student.jfcl.edu.bd` | `Student@1234` | Class 10 (Science), Active |
| **Student** | Roll `105` or `STU1005` | `Student@1234` | Requires Activation (`JFCL-DEMO-5555`) |

---

## 4. Frontend-to-Backend API Mapping

| Frontend Page / Component | User Action / Operation | Backend Endpoint | Method | Role / Auth |
| :--- | :--- | :--- | :--- | :--- |
| `pages/auth/Login.jsx` | User sign-in | `/api/v1/auth/login` | `POST` | Public |
| `pages/auth/AccountActivation.jsx` | Activate student account | `/api/v1/auth/activate` | `POST` | Public |
| `hooks/useAuth.jsx` | Fetch current session | `/api/v1/auth/me` | `GET` | Authenticated |
| `pages/admin/Dashboard.jsx` | Dashboard counts & stats | `/api/v1/admin/dashboard/stats` | `GET` | `admin` |
| `pages/admin/Students.jsx` | List, search & filter students | `/api/v1/admin/students` | `GET` | `admin` |
| `pages/admin/Students.jsx` | Add new student | `/api/v1/admin/students` | `POST` | `admin` |
| `pages/admin/Students.jsx` | Edit student details | `/api/v1/admin/students/:id` | `PUT` | `admin` |
| `pages/admin/Students.jsx` | Remove student record | `/api/v1/admin/students/:id` | `DELETE` | `admin` |
| `pages/admin/Teachers.jsx` | List & filter faculty | `/api/v1/admin/teachers` | `GET` | `admin` |
| `pages/admin/Teachers.jsx` | Add faculty member | `/api/v1/admin/teachers` | `POST` | `admin` |
| `pages/admin/Results.jsx` | View all mark submissions | `/api/v1/admin/results` | `GET` | `admin` |
| `pages/admin/Results.jsx` | Approve / Publish / Reject results | `/api/v1/admin/results/:id/action`| `PATCH` | `admin` |
| `pages/teacher/Dashboard.jsx` | Teacher assigned classes | `/api/v1/teacher/assignments` | `GET` | `teacher` |
| `pages/teacher/MarksEntry.jsx` | Fetch or initialize draft | `/api/v1/teacher/marks/draft` | `POST` | `teacher` |
| `pages/teacher/MarksEntry.jsx` | Save mark evaluations | `/api/v1/teacher/marks/:submissionId`| `PUT` | `teacher` |
| `pages/teacher/MarksEntry.jsx` | Submit marks for admin approval | `/api/v1/teacher/marks/:submissionId/submit`| `POST` | `teacher` |
| `pages/teacher/Attendance.jsx` | Fetch daily attendance | `/api/v1/teacher/attendance` | `GET` | `teacher` |
| `pages/teacher/Attendance.jsx` | Save daily attendance sheet | `/api/v1/teacher/attendance` | `POST` | `teacher` |
| `pages/student/Results.jsx` | Student own published results | `/api/v1/student/results` | `GET` | `student` |
| `pages/student/Attendance.jsx`| Student personal attendance log | `/api/v1/student/attendance` | `GET` | `student` |
| `pages/public/Results.jsx` | Public result search by roll | `/api/v1/public/results` | `GET` | Public |
| `pages/public/Notices.jsx` | Public institutional notices | `/api/v1/public/notices` | `GET` | Public |
| `pages/public/Admission.jsx` | Submit admission application | `/api/v1/public/admissions` | `POST` | Public |

---

## 5. Result Management & Evaluation Workflow
1. **Draft Stage**: Teacher initializes and edits component marks (Written, MCQ, Practical, Continuous Assessment). Automatic recalculation of total marks, grades (A+, A, A-, B, C, D, F) and grade points (5.00 to 0.00). Full marks and pass criteria are validated server-side. Negative marks are rejected (422).
2. **Submitted Stage**: Teacher submits the marks sheet. The sheet is locked from further teacher modification.
3. **Admin Verification & Approval**: The institutional exam administrator reviews the marks submission. The admin can approve the submission or return it with an administrative note for correction.
4. **Publication**: Once approved, the admin marks the result as published. Only published results appear in the student portal and public result archive.

---

## 6. Setup & Execution Instructions

### A. Start the Backend Server
```bash
cd jfcl-backend
npm install
npm run dev
# Server will run at http://localhost:5000/api/v1
```

### B. Run the Automated Test Suite
```bash
cd jfcl-backend
npm test
# Executes all 25 integration tests across Auth, Roles, Marks, Workflow & Privacy
```
