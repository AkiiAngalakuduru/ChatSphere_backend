const express = require('express');

const {
  register,
  login,
  getMe,
} = require('../controllers/AuthController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

// GET /api/auth/me
router.get('/me', authMiddleware, getMe);

module.exports = router;