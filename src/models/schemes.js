'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class scheme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      scheme.hasOne(models.group,{
        sourceKey :'schemeGroupId',
        foreignKey :'id'
      }) 
    }
  }
  scheme.init({
    schemeName: DataTypes.STRING,
    schemeType: DataTypes.STRING,
    schemeDesc: DataTypes.STRING,
    schemeUrl: DataTypes.STRING,
    schemeGroupId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'scheme',
    tableName: 'schemes'
  });
  return scheme;
};