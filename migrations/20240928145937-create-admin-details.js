"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("AdminDetails", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      admin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Mengaitkan ke tabel Users
          key: "id",
        },
        onDelete: "CASCADE",
      },
      bank_account_1: {
        type: Sequelize.STRING,
        allowNull: true, // Nama atau nomor rekening bank 1
      },
      bank_account_2: {
        type: Sequelize.STRING,
        allowNull: true, // Nama atau nomor rekening bank 2
      },
      e_money: {
        type: Sequelize.STRING,
        allowNull: true, // Informasi e-money (seperti nomor atau ID akun)
      },
      qr_code: {
        type: Sequelize.STRING,
        allowNull: true, // URL gambar QR code pembayaran
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("AdminDetails");
  },
};
