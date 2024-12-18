'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Material extends Model {
    static associate(models) {
      Material.belongsTo(models.Forum, {
        foreignKey: 'forum_id',
        as: 'forum',
      });

      // Asosiasi dengan MaterialFile
      Material.hasMany(models.MaterialFile, {
        foreignKey: 'material_id',
        as: 'files',
        onDelete: 'CASCADE',
      });
    }
  }
  Material.init(
    {
      forum_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Forums',
          key: 'id',
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Material',
      tableName: 'Materials',
      underscored: true,
    }
  );
  return Material;
};
