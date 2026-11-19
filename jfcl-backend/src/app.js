// =============================================================================
// app.js — Express Application Setup
// =============================================================================
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { corsOptions } from './config/corsOptions.js';
import { env } from './config/env.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import apiRouter from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

// Security HTTP headers
app.use(helmet());

// CORS configuration
app.use(cors(corsOptions));

// Logging
if (env.NODE_ENV !== 'test') {
  app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// Request body and cookie parsers
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());

// Rate Limiting
app.use('/api/v1', generalLimiter);

// Main API Router
app.use('/api/v1', apiRouter);

// 404 handler for undefined routes
app.use(notFoundHandler);

// Global centralized error handler
app.use(errorHandler);

export default app;
