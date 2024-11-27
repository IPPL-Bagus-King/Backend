const authorizeAdmin = (req, res, next) => {
  try {
    // Memeriksa apakah role pengguna adalah admin
    if (req.user && req.user.role === 'admin') {
      return next(); // Lanjut ke controller jika role adalah admin
    } else {
      return res.status(403).json({
        message: 'Access forbidden: Only admin role can access!',
      });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = authorizeAdmin;
