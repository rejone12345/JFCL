import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { TeacherLayout } from './layouts/TeacherLayout';
import { StudentLayout } from './layouts/StudentLayout';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Public Pages
import { Home } from './pages/public/Home';
import { About } from './pages/public/About';
import { Academics } from './pages/public/Academics';
import { Teachers } from './pages/public/Teachers';
import { Notices } from './pages/public/Notices';
import { NoticeDetail } from './pages/public/NoticeDetail';
import { Admission } from './pages/public/Admission';
import { Gallery } from './pages/public/Gallery';
import { Events } from './pages/public/Events';
import { EventDetail } from './pages/public/EventDetail';
import { Contact } from './pages/public/Contact';
import { Results } from './pages/public/Results';

// Auth Pages
import { Login } from './pages/auth/Login';
import { StudentSignup } from './pages/auth/StudentSignup';
import { AccountActivation } from './pages/auth/AccountActivation';
import { ForgotPassword } from './pages/auth/ForgotPassword';

// Admin Pages
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminStudents } from './pages/admin/Students';
import { StudentDetail } from './pages/admin/StudentDetail';
import { AdminTeachers } from './pages/admin/Teachers';
import { AdminAcademics } from './pages/admin/Academics';
import { AdminClasses } from './pages/admin/Classes';
import { AdminSubjects } from './pages/admin/Subjects';
import { AdminExaminations } from './pages/admin/Examinations';
import { AdminResults } from './pages/admin/Results';
import { AdminAttendance } from './pages/admin/Attendance';
import { AdminAdmissions } from './pages/admin/Admissions';
import { AdminNotices } from './pages/admin/Notices';
import { AdminEvents } from './pages/admin/Events';
import { AdminGallery } from './pages/admin/Gallery';
import { AdminReports } from './pages/admin/Reports';
import { AdminSettings } from './pages/admin/Settings';

// Teacher Pages
import { TeacherDashboard } from './pages/teacher/Dashboard';
import { MarksEntry } from './pages/teacher/MarksEntry';
import { TeacherClasses } from './pages/teacher/Classes';
import { TeacherSubjects } from './pages/teacher/Subjects';
import { TeacherStudents } from './pages/teacher/Students';
import { TeacherAttendance } from './pages/teacher/Attendance';
import { TeacherResults } from './pages/teacher/Results';
import { TeacherNotices } from './pages/teacher/Notices';
import { TeacherProfile } from './pages/teacher/Profile';

// Student Pages
import { StudentDashboard } from './pages/student/Dashboard';
import { StudentProfile } from './pages/student/Profile';
import { StudentResults } from './pages/student/Results';
import { StudentMarksheet } from './pages/student/Marksheet';
import { StudentAttendance } from './pages/student/Attendance';
import { StudentNotices } from './pages/student/Notices';
import { StudentAcademics } from './pages/student/Academics';
import { StudentSettings } from './pages/student/Settings';

export default function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/notices/:id" element={<NoticeDetail />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/results" element={<Results />} />
      </Route>

      {/* Auth Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/student/signup" element={<StudentSignup />} />
      <Route path="/account-activation" element={<AccountActivation />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Admin Portal — Protected: Strictly Requires Logged In Admin */}
      <Route element={<ProtectedRoute allowedRole="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="students/:id" element={<StudentDetail />} />
          <Route path="teachers" element={<AdminTeachers />} />
          <Route path="academics" element={<AdminAcademics />} />
          <Route path="classes" element={<AdminClasses />} />
          <Route path="subjects" element={<AdminSubjects />} />
          <Route path="examinations" element={<AdminExaminations />} />
          <Route path="results" element={<AdminResults />} />
          <Route path="attendance" element={<AdminAttendance />} />
          <Route path="admissions" element={<AdminAdmissions />} />
          <Route path="notices" element={<AdminNotices />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Route>

      {/* Teacher Portal — Protected: Strictly Requires Logged In Teacher */}
      <Route element={<ProtectedRoute allowedRole="teacher" />}>
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<Navigate to="/teacher/dashboard" replace />} />
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="marks-entry" element={<MarksEntry />} />
          <Route path="classes" element={<TeacherClasses />} />
          <Route path="subjects" element={<TeacherSubjects />} />
          <Route path="students" element={<TeacherStudents />} />
          <Route path="attendance" element={<TeacherAttendance />} />
          <Route path="results" element={<TeacherResults />} />
          <Route path="notices" element={<TeacherNotices />} />
          <Route path="profile" element={<TeacherProfile />} />
        </Route>
      </Route>

      {/* Student Portal — Protected: Strictly Requires Logged In Student */}
      <Route element={<ProtectedRoute allowedRole="student" />}>
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Navigate to="/student/dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="results" element={<StudentResults />} />
          <Route path="marksheets" element={<StudentMarksheet />} />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route path="notices" element={<StudentNotices />} />
          <Route path="academics" element={<StudentAcademics />} />
          <Route path="settings" element={<StudentSettings />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
