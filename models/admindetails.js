"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AdminDetails extends Model {
    static associate(models) {
      // Definisikan asosiasi di sini
      AdminDetails.belongsTo(models.User, {
        foreignKey: "admin_id",
        as: "admin",
      });
    }
  }
  AdminDetails.init(
    {
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User", // Mengaitkan ke tabel Users
          key: "id",
        },
        onDelete: "CASCADE",
      },
      bank_account_1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bank_account_2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      e_money: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      qr_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "AdminDetails",
      tableName: "AdminDetails",
      underscored: true,
    }
  );
  return AdminDetails;
};
