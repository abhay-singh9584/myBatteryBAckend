'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class secondaryName extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      secondaryName.hasOne(models.batteryBrand,{
        sourceKey :'brandId',
        foreignKey :'id'
      }) 
    }
  }
  secondaryName.init({
    secondaryName: DataTypes.STRING,
    brandId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'secondaryName',
    tableName: 'secondarynames'
  });
  return secondaryName;
};