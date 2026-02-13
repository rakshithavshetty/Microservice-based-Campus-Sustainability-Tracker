const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  const userAgent = req.headers['user-agent'] || '';

  // 💥 Allow if request is coming from Swagger UI
  if (userAgent.toLowerCase().includes('swagger')) {
    console.log('✅ Swagger request detected, skipping token check');
    return next();
  }

  let token = req.headers.authorization;

  if (token && token.startsWith('Bearer ')) {
    try {
      token = token.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token, not authorized' });
    }
  } else {
    return res.status(401).json({ message: 'No token, not authorized' });
  }
};
