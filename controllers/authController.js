const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Import model User

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cari pengguna berdasarkan email
    const user = await User.findOne({ where: { email } });

    // Jika pengguna tidak ditemukan
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Membandingkan password hash dengan password yang diinput
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Membuat token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role }, // Payload
      process.env.JWT_SECRET, // Secret key dari .env
      { expiresIn: '1h' } // Token berlaku 1 jam
    );

    // Mengembalikan token ke klien
    return res.status(200).json({
      message: 'Login successful',
      token, // Kirim token ke klien
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Cek apakah pengguna sudah terdaftar dengan email yang sama
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash password sebelum menyimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat pengguna baru dengan password yang sudah di-hash
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role, // 'teacher', 'student', 'admin', etc.
    });

    // Membuat token JWT untuk pengguna baru
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role }, // Payload token
      process.env.JWT_SECRET, // Secret key dari .env
      { expiresIn: '1h' } // Token berlaku selama 1 jam
    );

    // Mengembalikan respon ke klien
    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
      token, // Token JWT yang bisa digunakan untuk login langsung
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  login,
  register,
};