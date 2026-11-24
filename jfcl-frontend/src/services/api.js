import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token if present in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jfcl_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to normalize errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const customError = {
      message: error.response?.data?.message || error.message || 'An unexpected error occurred.',
      status: error.response?.status,
      errors: error.response?.data?.errors || null,
    };
    return Promise.reject(customError);
  }
);

export default api;

// ── Authentication APIs ──────────────────────────────────────────────────────
export const authApi = {
  login: (data) => api.post('/auth/login', data),
  verifyOtp: (data) => api.post('/auth/verify-otp', data),
  resendOtp: (data) => api.post('/auth/resend-otp', data),
  registerStudent: (data) => api.post('/auth/register-student', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  activateAccount: (data) => api.post('/auth/activate', data),
};

// ── Admin APIs ───────────────────────────────────────────────────────────────
export const adminApi = {
  getStats: () => api.get('/admin/dashboard/stats'),
  getStudents: (params) => api.get('/admin/students', { params }),
  getStudent: (id) => api.get(`/admin/students/${id}`),
  createStudent: (data) => api.post('/admin/students', data),
  updateStudent: (id, data) => api.put(`/admin/students/${id}`, data),
  deleteStudent: (id) => api.delete(`/admin/students/${id}`),

  getTeachers: (params) => api.get('/admin/teachers', { params }),
  createTeacher: (data) => api.post('/admin/teachers', data),
  updateTeacher: (id, data) => api.put(`/admin/teachers/${id}`, data),
  deleteTeacher: (id) => api.delete(`/admin/teachers/${id}`),
  assignTeacher: (data) => api.post('/admin/assignments', data),

  getClasses: () => api.get('/admin/classes'),
  getSubjects: (params) => api.get('/admin/subjects', { params }),
  getExaminations: () => api.get('/admin/examinations'),
  getResults: () => api.get('/admin/results'),
  updateResultAction: (id, action, adminNote) =>
    api.patch(`/admin/results/${id}/action`, { action, adminNote }),
  getAttendance: () => api.get('/admin/attendance'),
  getNotices: () => api.get('/admin/notices'),
  getAdmissions: () => api.get('/admin/admissions'),
};

// ── Teacher APIs ─────────────────────────────────────────────────────────────
export const teacherApi = {
  getProfile: () => api.get('/teacher/profile'),
  getAssignments: () => api.get('/teacher/assignments'),
  getStudents: () => api.get('/teacher/students'),
  getDraft: (data) => api.post('/teacher/marks/draft', data),
  saveMarks: (submissionId, marks) => api.put(`/teacher/marks/${submissionId}`, { marks }),
  submitMarks: (submissionId) => api.post(`/teacher/marks/${submissionId}/submit`),
  getResults: () => api.get('/teacher/results'),
  getAttendance: (params) => api.get('/teacher/attendance', { params }),
  saveAttendance: (data) => api.post('/teacher/attendance', data),
};

// ── Student APIs ─────────────────────────────────────────────────────────────
export const studentApi = {
  getProfile: () => api.get('/student/profile'),
  getResults: (examId) => api.get('/student/results', { params: { examId } }),
  getAttendance: () => api.get('/student/attendance'),
  getNotices: () => api.get('/student/notices'),
  getAcademics: () => api.get('/student/academics'),
};

// ── Public APIs ──────────────────────────────────────────────────────────────
export const publicApi = {
  searchResult: (roll, examId) => api.get('/public/results', { params: { roll, examId } }),
  getNotices: () => api.get('/public/notices'),
  getNotice: (id) => api.get(`/public/notices/${id}`),
  getEvents: () => api.get('/public/events'),
  getGallery: () => api.get('/public/gallery'),
  getExaminations: () => api.get('/public/examinations'),
  submitAdmission: (data) => api.post('/public/admissions', data),
};
