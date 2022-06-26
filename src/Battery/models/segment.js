'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class segment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  segment.init({
    segmentName: DataTypes.STRING,
    segmentDesc: DataTypes.STRING,
    segmentIcon: DataTypes.STRING,
    segmentPosition: DataTypes.INTEGER,
    segmentBrandName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'segment',
  });
  return segment;
};