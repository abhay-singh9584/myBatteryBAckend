'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class schemegroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  schemegroup.init({
    groupId: DataTypes.INTEGER,
    schemeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'schemegroup',
    tableName: 'schemegroups'
  });
  return schemegroup;
};