const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Authentication failed: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Memasukkan user ke req.user, biasanya berisi id dan role
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Authentication failed: Invalid token' });
  }
};

module.exports = authenticateUser;
