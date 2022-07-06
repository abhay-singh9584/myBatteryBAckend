'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class oemModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      oemModel.hasOne(models.oemBrand,{
        sourceKey :'OEMBrandId',
        foreignKey :'id'
      }) 

    }
  }
  oemModel.init({
    OEMModelName: DataTypes.STRING,
    FuelType: DataTypes.STRING,
    OEMModelImage: DataTypes.STRING,
    OEMModelPosition: DataTypes.INTEGER,
    OEMBrandId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'oemModel',
    tableName: 'oem_models'
  });
  return oemModel;
};