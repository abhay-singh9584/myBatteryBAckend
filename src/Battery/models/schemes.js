'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class schemes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  schemes.init({
    schemeName: DataTypes.STRING,
    schemeType: DataTypes.STRING,
    schemeDesc: DataTypes.STRING,
    schemeUrl: DataTypes.STRING,
    schemeGroup: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'schemes',
  });
  return schemes;
};