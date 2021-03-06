'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  productType.init({
    typeName: DataTypes.STRING,
    typeIcon: DataTypes.STRING,
    typeDesc: DataTypes.STRING,
    typePosition: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'productType',
    tableName: 'producttypes'
  });
  return productType;
};