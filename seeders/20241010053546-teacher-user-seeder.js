'use strict';

const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword1 = await bcrypt.hash('teacher123', 10); // Hash password
    const hashedPassword2 = await bcrypt.hash('teacher456', 10); // Hash password

    // Membuat beberapa user dengan role teacher
    const teachers = await User.bulkCreate(
      [
        {
          email: 'teacher1@example.com',
          password: hashedPassword1,
          name: 'Herman Santoso',
          phone_number: `081234567891`,
          role: 'teacher',
          status: 'approved',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: 'teacher2@example.com',
          password: hashedPassword2,
          name: 'Lujeng Sumirah',
          phone_number: `082345678999`,
          role: 'teacher',
          status: 'approved',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { returning: true }
    ); // Mengembalikan instances teacher yang baru dibuat

    // membuat forum untuk tiap teacher
    await queryInterface.bulkInsert('Forums', [
      {
        name: 'Analisis Kompleksitas Algoritma Mas Herman',
        description: 'forum untuk belajar AKA',
        price: 200000,
        teacher_id: teachers[0].id, // Herman Santoso
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Struktur Data Mas Herman',
        description: 'mendiskusikan seputar struktur data',
        price: 150000,
        teacher_id: teachers[0].id, // Herman Santoso
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Kalkulus Teh Sumirah',
        description: 'tips cepat belajar kalkulus',
        price: 200000,
        teacher_id: teachers[1].id, // Lujeng Sumirah
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Teori Peluang Teh Sumirah',
        description: 'cara mudah belajar teori peluang',
        price: 200000,
        teacher_id: teachers[1].id, // Lujeng Sumirah
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Hapus data forum dan teacher
    await queryInterface.bulkDelete('Forums', null, {});
    await queryInterface.bulkDelete('Users', { role: 'teacher' }, {});
  },
};
