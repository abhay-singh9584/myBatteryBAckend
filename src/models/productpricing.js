'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productPricing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  productPricing.init({
    mrpIcon: DataTypes.STRING,
    mrpUnit: DataTypes.STRING,
    mrpValue: DataTypes.INTEGER,
    mopIcon: DataTypes.STRING,
    mopUnit: DataTypes.STRING,
    mopValue: DataTypes.INTEGER,
    dpIcon: DataTypes.STRING,
    dpUnit: DataTypes.STRING,
    dpValue: DataTypes.INTEGER,
    nlcIcon: DataTypes.STRING,
    nlcUnit: DataTypes.STRING,
    nlcValue: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'productPricing',
    tableName: 'productpricings'
  });
  return productPricing;
};