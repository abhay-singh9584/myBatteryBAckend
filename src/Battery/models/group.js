'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  group.init({
    groupName: DataTypes.STRING,
    groupDesc: DataTypes.STRING,
    groupIcon: DataTypes.STRING,
    groupBasedOn: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'group',
  });
  return group;
};