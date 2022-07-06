'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class modelDimension extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  modelDimension.init({
    modelName: DataTypes.STRING,
    modelDesc: DataTypes.STRING,
    modelIcon: DataTypes.STRING,
    modelPosition: DataTypes.INTEGER,
    length: DataTypes.INTEGER,
    width: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    layout: DataTypes.INTEGER,
    acidIndicator: DataTypes.INTEGER,
    currentCapacity: DataTypes.INTEGER,
    mrp: DataTypes.INTEGER,
    mop: DataTypes.INTEGER,
    dp: DataTypes.INTEGER,
    nlc: DataTypes.INTEGER,
    warranty: DataTypes.INTEGER,
    warrantyDesc: DataTypes.STRING,
    weight: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'modelDimension',
    tableName: 'modelDimensions'
  });
  return modelDimension;
};