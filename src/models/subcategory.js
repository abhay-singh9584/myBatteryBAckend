'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subcategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  subcategory.init({
    subcategoryName: DataTypes.STRING,
    subcategoryDesc: DataTypes.STRING,
    subcategoryIcon: DataTypes.STRING,
    subcategoryPosition: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'subcategory',
    tableName: 'subcategories'
  });
  return subcategory;
};