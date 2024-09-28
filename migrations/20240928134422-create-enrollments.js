"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Enrollments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      forum_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Forums",
          key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE",
      },
      student_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE",
      },
      status: {
        type: Sequelize.ENUM("enrolled", "pending", "rejected"),
        allowNull: false,
        defaultValue: "pending",
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      payment_proof: {
        type: Sequelize.STRING, // Menyimpan path atau URL gambar bukti pembayaran
        allowNull: true,
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
    await queryInterface.dropTable("Enrollments");
  },
};
