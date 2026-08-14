import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';


export const helmetMiddleware = helmet();


export const corsMiddleware = cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});


export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'fail',
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  },
});


export const authRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 10,
  message: {
    status: 'fail',
    message: 'Too many authentication attempts, please try again later.',
  },
});