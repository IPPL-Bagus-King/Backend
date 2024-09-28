"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      // Definisikan asosiasi di sini
      Review.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user", // Alias untuk asosiasi
      });
      Review.belongsTo(models.Forum, {
        foreignKey: "forum_id",
        as: "forum", // Alias untuk asosiasi
      });
    }
  }

  Review.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Mengaitkan ke tabel Users
          key: "id",
        },
        onDelete: "CASCADE", // Jika user dihapus, maka review terkait juga dihapus
      },
      forum_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Forums", // Mengaitkan ke tabel Forums
          key: "id",
        },
        onDelete: "CASCADE", // Jika forum dihapus, maka review terkait juga dihapus
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false, // Pastikan rating diisi
        validate: {
          min: 0, // Minimum rating
          max: 5, // Maximum rating
        },
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false, // Pastikan ulasan diisi
      },
    },
    {
      sequelize,
      modelName: "Review",
      tableName: "Reviews", // Nama tabel di database
      underscored: true,
    }
  );

  return Review;
};
