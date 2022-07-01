'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class oemBrand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  oemBrand.init({
    OEMBrand: DataTypes.STRING,
    OEMBrandImage: DataTypes.STRING,
    OEMB: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'oemBrand',
    tableName: 'oem_brands'
  });
  return oemBrand;
};