'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productMedia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  productMedia.init({
    ProductImages: DataTypes.STRING,
    productVideos: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'productMedia',
    tableName: 'productmedia'
  });
  return productMedia;
};