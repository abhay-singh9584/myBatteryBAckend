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
    lengthUnit: DataTypes.STRING,
    lengthValue: DataTypes.INTEGER,
    widthUnit: DataTypes.STRING,
    widthValue: DataTypes.INTEGER,
    heightUnit: DataTypes.STRING,
    heightValue: DataTypes.INTEGER,
    layoutValue: DataTypes.INTEGER,
    acidIndicatorUnit: DataTypes.STRING,
    acidIndicatorValue: DataTypes.INTEGER,
    currentCapacityUnit: DataTypes.STRING,
    currentCapacityValue: DataTypes.INTEGER,
    warrantyUnit: DataTypes.STRING,
    warrantyValue: DataTypes.INTEGER,
    warrantyDesc: DataTypes.STRING,
    weightUnit: DataTypes.STRING,
    weightValue: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'modelDimension',
    tableName: 'modelDimensions'
  });
  return modelDimension;
};