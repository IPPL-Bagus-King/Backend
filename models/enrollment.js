'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    static associate(models) {
      // mendefinisikan relasi
      Enrollment.belongsTo(models.User, {
        foreignKey: 'student_id',
        as: 'student',
      });
      Enrollment.belongsTo(models.Forum, {
        foreignKey: 'forum_id',
        as: 'forum',
      });
    }
  }
  Enrollment.init(
    {
      forum_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Forums', // Mengaitkan ke tabel Forums
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      student_id: {
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
      modelName: 'Enrollment',
      tableName: 'Enrollments', // Nama tabel di database
      underscored: true,
    }
  );
  return Enrollment;
};
