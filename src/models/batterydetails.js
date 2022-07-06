'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class batteryDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      batteryDetail.hasOne(models.batteryBrand,{
        sourceKey :'brandId',
        foreignKey :'id'
      }) ,
      batteryDetail.hasOne(models.modelDimension,{
        sourceKey :'modelId',
        foreignKey :'id'
      }) ,
      batteryDetail.hasOne(models.group,{
        sourceKey :'groupId',
        foreignKey :'id'
      }) ,
      batteryDetail.hasOne(models.oemModel,{
        sourceKey :'oemModelId',
        foreignKey :'id'
      }) ,
      batteryDetail.hasOne(models.scheme,{
        sourceKey :'schemeId',
        foreignKey :'id'
      }) ,
      batteryDetail.hasOne(models.secondaryName,{
        sourceKey :'secondaryNameId',
        foreignKey :'id'
      }) ,
      batteryDetail.hasOne(models.segment,{
        sourceKey :'segmentId',
        foreignKey :'id'
      }) ,
      batteryDetail.hasOne(models.subcategory,{
        sourceKey :'subCategoryId',
        foreignKey :'id'
      })
    }
  }
  batteryDetail.init({
    brandId: DataTypes.INTEGER,
    modelId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    oemModelId: DataTypes.INTEGER,
    schemeId: DataTypes.INTEGER,
    secondaryNameId: DataTypes.INTEGER,
    segmentId: DataTypes.INTEGER,
    subCategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'batteryDetail',
    tableName: 'batterydetails'
  });
  return batteryDetail;
};