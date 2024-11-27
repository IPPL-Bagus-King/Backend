'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Forum extends Model {
    static associate(models) {
      // Definisikan asosiasi di sini
      Forum.hasMany(models.Enrollment, {
        foreignKey: 'forum_id',
        as: 'enrollments',
      });
      Forum.belongsTo(models.User, {
        foreignKey: 'teacher_id', // Menentukan foreign key
        as: 'teacher', // Alias untuk asosiasi
      });
    }
  }
  Forum.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Mengaitkan ke tabel Users
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'Forum',
      tableName: 'Forums', // Nama tabel di database
      underscored: true,
    }
  );
  return Forum;
};
