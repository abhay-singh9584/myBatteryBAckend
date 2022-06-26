'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class oem_model extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  oem_model.init({
    OEMModelName: DataTypes.STRING,
    FuelType: DataTypes.STRING,
    OEMModelImage: DataTypes.STRING,
    OEMModelPosition: DataTypes.INTEGER,
    OEMBrandName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'oem_model',
  });
  return oem_model;
};