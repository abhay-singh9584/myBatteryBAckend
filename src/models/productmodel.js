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
      productModel.belongsToMany(models.group,{
        through: 'modelgroup'
      })
    }
  }

  productModel.init({
    modelName: DataTypes.STRING,
    modelType:DataTypes.STRING,
    modelIcon: DataTypes.STRING,
    modelDesc: DataTypes.STRING,
    modelPosition: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'productModel',
    tableName: 'productmodels'
  });
  return productModel;
};