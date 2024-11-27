'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MaterialFile extends Model {
    static associate(models) {
      MaterialFile.belongsTo(models.Material, {
        foreignKey: 'material_id',
        as: 'material',
      });
    }
  }
  MaterialFile.init(
    {
      file_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      material_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Materials',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'MaterialFile',
      tableName: 'MaterialFiles',
      underscored: true,
    }
  );
  return MaterialFile;
};
