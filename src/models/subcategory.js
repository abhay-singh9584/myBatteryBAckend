'use strict';
const {
  Model
} = require('sequelize');
// const { category }=require('./index')
module.exports = (sequelize, DataTypes) => {
  class subcategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      subcategory.hasOne(models.category,{
        sourceKey :'categoryId',
        foreignKey :'id'
      }) 
    }
  }
  subcategory.init({
    subcategoryName: DataTypes.STRING,
    subcategoryDesc: DataTypes.STRING,
    subcategoryIcon: DataTypes.STRING,
    subcategoryPosition: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'subcategory',
    tableName: 'subcategories'
  });
  return subcategory;
};