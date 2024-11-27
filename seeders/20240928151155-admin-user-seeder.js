'use strict';

const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('admin123', 10); // Hash password

    // Membuat user admin dengan metode create
    User.create({
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin User',
      phone_number: '081111111111',
      picture: '/images/user/1.png',
      role: 'admin',
      status: 'approved',
      created_at: new Date(),
      updated_at: new Date(),
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Hapus data admin
    await queryInterface.bulkDelete(
      'Users',
      { email: 'admin@example.com' },
      {}
    );
  },
};
