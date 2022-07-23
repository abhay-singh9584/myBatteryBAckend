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
      batteryDetail.hasOne(models.segment,{
        sourceKey :'segmentId',
        foreignKey :'id'
      }) ,
      batteryDetail.hasOne(models.category,{
        sourceKey :'categoryId',
        foreignKey :'id'
      }) ,
      batteryDetail.hasOne(models.productPricing,{
        sourceKey :'productPricingId',
        foreignKey :'id'
      }) ,
      batteryDetail.hasOne(models.modelDimension,{
        sourceKey :'modelDimensionId',
        foreignKey :'id'
      }) ,
      batteryDetail.hasOne(models.productType,{
        sourceKey :'productTypeId',
        foreignKey :'id'
      }),
      batteryDetail.hasOne(models.productMedia,{
        sourceKey :'productMediaId',
        foreignKey :'id'
      }) ,
      batteryDetail.hasOne(models.productModel,{
        sourceKey :'modelId',
        foreignKey :'id'
      }) 
    }
  }

  batteryDetail.init({
    primaryName: DataTypes.STRING,
    secondaryName: DataTypes.STRING,
    productImage: DataTypes.STRING,
    productMediaId: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER,
    modelId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    oemModelId: DataTypes.INTEGER,
    schemeId: DataTypes.INTEGER,
    segmentId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    productTypeId: DataTypes.INTEGER,
    modelDimensionId: DataTypes.INTEGER,
    productPricingId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'batteryDetail',
    tableName: 'batterydetails'
  });
  return batteryDetail;
};