const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const authHeader = req.header('Authorization'); // Ambil header Authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Authentication failed: No token provided' });
  }

  const token = authHeader.replace('Bearer ', ''); // Hapus prefix "Bearer "

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifikasi token
    req.user = decoded; // Tambahkan data user ke req
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Authentication failed: Invalid token' });
  }
};

module.exports = authenticateUser;
