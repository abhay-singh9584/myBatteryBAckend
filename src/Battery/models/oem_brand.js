'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class oem_brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  oem_brand.init({
    OEMBrand: DataTypes.STRING,
    OEMBrandImage: DataTypes.STRING,
    OEMB: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'oem_brand',
  });
  return oem_brand;
};