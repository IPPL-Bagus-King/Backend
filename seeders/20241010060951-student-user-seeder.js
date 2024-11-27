'use strict';

const { User, Enrollment } = require('../models');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword1 = await bcrypt.hash('student123', 10);
    const hashedPassword2 = await bcrypt.hash('student456', 10);
    const hashedPassword3 = await bcrypt.hash('student789', 10);

    // Membuat beberapa user dengan role student
    const students = await User.bulkCreate(
      [
        {
          email: 'student1@example.com',
          password: hashedPassword1,
          name: 'Raka Aditya',
          phone_number: '083453453453',
          picture: '/images/user/1.png',
          role: 'student',
          status: 'approved',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: 'student2@example.com',
          password: hashedPassword2,
          name: 'Valentino Hartanto',
          phone_number: '082121212121',
          picture: '/images/user/3.png',
          role: 'student',
          status: 'approved',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: 'student3@example.com',
          password: hashedPassword3,
          name: 'Gede Bagus',
          phone_number: '086767676767',
          picture: '/images/user/1.png',
          role: 'student',
          status: 'approved',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { returning: true }
    ); // Mengembalikan instances student yang baru dibuat

    // membuat enrollment untuk tiap student
    await Enrollment.bulkCreate([
      {
        student_id: students[0].id, // Raka
        forum_id: 1, // Analisis Kompleksitas Algoritma Mas Herman
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        student_id: students[0].id, // Raka
        forum_id: 2, // Struktur Data Mas Herman
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        student_id: students[1].id, // Valen
        forum_id: 2, // Struktur Data Mas Herman
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        student_id: students[1].id, // Valen
        forum_id: 3, // Kalkulus Teh Sumirah
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        student_id: students[2].id, // Bagus
        forum_id: 2, //Struktur Data Mas Herman
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        student_id: students[2].id, // Bagus
        forum_id: 3, // Kalkulus Teh Sumirah
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Hapus data enrollment dan student
    await queryInterface.bulkDelete('Enrollments', null, {});
    await queryInterface.bulkDelete('Users', { role: 'student' }, {});
  },
};
