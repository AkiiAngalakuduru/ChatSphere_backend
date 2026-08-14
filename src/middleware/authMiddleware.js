const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Not authorized, no token',
      });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(' ')[1];

    // Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Attach decoded user information to request
    req.user = decoded;

    // Continue to the controller
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Not authorized, invalid or expired token',
    });
  }
};

module.exports = authMiddleware;