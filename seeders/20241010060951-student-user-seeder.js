'use strict';

const { User } = require('../models');
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
          role: 'student',
          status: 'approved',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { returning: true }
    ); // Mengembalikan instances student yang baru dibuat
  },

  down: async (queryInterface, Sequelize) => {
    // Hapus data student
    await queryInterface.bulkDelete('Users', { role: 'student' }, {});
  },
};
