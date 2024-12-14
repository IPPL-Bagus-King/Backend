'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Checkout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Checkout.belongsTo(models.Forum, {
        as: 'forum',
        foreignKey: 'id_forum'
      });
      Checkout.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'id_user'
      });
    }
  }
  Checkout.init({
    id_user: DataTypes.INTEGER,
    id_forum: DataTypes.INTEGER,
    status: DataTypes.STRING,
    order_id: DataTypes.STRING,
    bank: DataTypes.STRING,
    va_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Checkout',
  });
  return Checkout;
};