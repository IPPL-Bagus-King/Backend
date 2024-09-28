"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    static associate(models) {
      // Definisikan asosiasi di sini
      Enrollment.belongsTo(models.User, {
        foreignKey: "student_id",
        as: "student",
      });
      Enrollment.belongsTo(models.Forum, {
        foreignKey: "forum_id",
        as: "forum",
      });
    }
  }
  Enrollment.init(
    {
      forum_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Forums", // Mengaitkan ke tabel Forums
          key: "id",
        },
        onDelete: "CASCADE",
      },
      student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Mengaitkan ke tabel Users
          key: "id",
        },
        onDelete: "CASCADE",
      },
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        allowNull: false,
        defaultValue: "pending", // Status awal adalah pending
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false, // Sesuaikan sesuai kebutuhan
      },
      payment_proof: {
        type: DataTypes.STRING,
        allowNull: false, // Sesuaikan sesuai kebutuhan
      },
    },
    {
      sequelize,
      modelName: "Enrollment",
      tableName: "Enrollments", // Nama tabel di database
      underscored: true,
    }
  );
  return Enrollment;
};
