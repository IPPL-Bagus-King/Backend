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

    // payload token JWT
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      phone_number: user.phone_number,
      status: user.status,
      picture: user.picture,
    };

    // Membuat token JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

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
    const { email, password, name, phone_number, role } = req.body;

    // Cek apakah pengguna sudah terdaftar dengan email yang sama
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash password sebelum menyimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tentukan status berdasarkan role
    let status = 'approved'; // Default status untuk student
    if (role === 'teacher') {
      status = 'pending'; // Teacher perlu disetujui admin
    }

    // Buat pengguna baru dengan password yang sudah di-hash
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      phone_number,
      picture: '/images/user/' + Math.floor(Math.random() * 10) + '.png',
      role, // 'teacher', 'student', 'admin'
      status,
    });

    // payload token JWT
    const payload = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      name: newUser.name,
      phone_number: newUser.phone_number,
      status: newUser.status,
      picture: newUser.picture,
    };
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log('Payload for Token:', payload);

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
