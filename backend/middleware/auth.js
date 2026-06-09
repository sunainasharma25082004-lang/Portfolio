import dotenv from 'dotenv';
dotenv.config();

export const protectAdmin = (req, res, next) => {
  const token =
    req.query.token ||
    req.headers['x-admin-token'] ||
    req.headers.authorization?.replace('Bearer ', '');

  const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

  if (!ADMIN_TOKEN) {
    // If no token set in env, allow in development only
    if (process.env.NODE_ENV !== 'production') {
      console.warn('⚠️  ADMIN_TOKEN not set — allowing admin access (dev only)');
      return next();
    }
    return res.status(403).json({ success: false, message: 'Admin access not configured' });
  }

  if (token && token === ADMIN_TOKEN) {
    return next();
  }

  return res.status(401).json({ 
    success: false, 
    message: 'Unauthorized. Invalid or missing admin token.' 
  });
};
