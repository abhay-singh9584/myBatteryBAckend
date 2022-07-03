const {
  Model
} = require('sequelize');

// const {segment}=require('./index')

module.exports = (sequelize, DataTypes) => {
  class batteryBrand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // batteryBrand.hasOne(models,segment,{
      //   sourceKey: 'brandId',
      //   foreignKey: 'id'
      // })
      
    }
  }
  batteryBrand.init({
    brandName: DataTypes.STRING,
    brandLogo: DataTypes.STRING,
    brandDesc: DataTypes.STRING,
    brandIcon: DataTypes.STRING,
    brandPosition: DataTypes.INTEGER
  } ,{
    sequelize,
    modelName: 'batteryBrand',
    tableName: 'battery_brands'
  });
  return batteryBrand;
};