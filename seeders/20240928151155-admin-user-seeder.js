"use strict";

const { User, AdminDetails } = require("../models"); // Pastikan model diimport

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Membuat user admin dengan metode create
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Menambahkan data di tabel AdminDetails
    await AdminDetails.create({
      admin_id: adminUser.id, // Menggunakan ID dari user admin yang baru dibuat
      bank_account_1: "1234567890 (Bank A)",
      bank_account_2: "0987654321 (Bank B)",
      e_money: "0123456789 (E-Money Provider)",
      qr_code: "https://example.com/qr-code-admin.png",
      created_at: new Date(),
      updated_at: new Date(),
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Hapus data admin
    await queryInterface.bulkDelete("AdminDetails", null, {});
    await queryInterface.bulkDelete(
      "Users",
      { email: "admin@example.com" },
      {}
    );
  },
};
