// =============================================================================
// routes/index.js — Root router: mounts all sub-routers under /api/v1
// =============================================================================
import { Router } from 'express';
import authRoutes    from './auth.routes.js';
import adminRoutes   from './admin.routes.js';
import teacherRoutes from './teacher.routes.js';
import studentRoutes from './student.routes.js';
import publicRoutes  from './public.routes.js';
import { sendSuccess } from '../utils/response.js';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  return sendSuccess(res, {
    data: {
      status:    'ok',
      service:   'JFCL Backend API',
      version:   'v1',
      phase:     'Phase 1 — In-Memory (No Database)',
      timestamp: new Date().toISOString(),
      uptime:    Math.floor(process.uptime()) + 's',
    },
    message: 'JFCL API is running.',
  });
});

router.use('/auth',    authRoutes);
router.use('/admin',   adminRoutes);
router.use('/teacher', teacherRoutes);
router.use('/student', studentRoutes);
router.use('/public',  publicRoutes);

export default router;
