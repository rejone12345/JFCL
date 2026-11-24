// =============================================================================
// routes/auth.routes.js
// =============================================================================
import { Router } from 'express';
import { login, logout, getMe, activateAccount, registerStudent } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/login',            authLimiter, login);
router.post('/register-student', authLimiter, registerStudent);
router.post('/logout',           logout);
router.post('/activate',         authLimiter, activateAccount);
router.get('/me',                authenticate, getMe);

export default router;
