const authorizeTeacher = (req, res, next) => {
  try {
    // Memeriksa apakah role pengguna adalah teacher
    if (req.user && req.user.role === 'teacher') {
      return next(); // Lanjut ke controller jika role adalah teacher
    } else {
      return res.status(403).json({
        message: 'Access forbidden: Only teacher role can access!',
      });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = authorizeTeacher;
