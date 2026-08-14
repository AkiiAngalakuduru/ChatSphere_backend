import express from 'express';
import { helmetMiddleware, corsMiddleware, globalRateLimiter, authRateLimiter } from './middleware/security.js';
import { errorHandler } from './middleware/errorHandler.js';
import { AppError } from './utils/AppError.js';
import authRoutes from './routes/authRoutes.js';
const app = express();
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', globalRateLimiter);
app.use('/api/v1/auth', authRateLimiter, authRoutes);
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});
app.use(errorHandler);
export default app;