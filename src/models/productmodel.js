'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      productModel.hasOne(models.batteryBrand,{
        sourceKey :'brandId',
        foreignKey :'id'
      }),
      productModel.hasOne(models.group,{
        sourceKey :'groupId',
        foreignKey :'id'
      })
    }
  }

  productModel.init({
    modelName: DataTypes.STRING,
    modelIcon: DataTypes.STRING,
    modelDesc: DataTypes.STRING,
    modelPosition: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'productModel',
    tableName: 'productmodels'
  });
  return productModel;
};