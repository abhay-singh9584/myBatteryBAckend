const {
  Model
} = require('sequelize');

// const {batteyBrand}=require('./index')

module.exports = (sequelize, DataTypes) => {
  class segment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      segment.hasOne(models.oemBrand,{
        sourceKey :'segmentBrandId',
        foreignKey :'id'
      }) 

    }
  }
  segment.init({
    segmentName: DataTypes.STRING,
    segmentDesc: DataTypes.STRING,
    segmentIcon: DataTypes.STRING,
    segmentPosition: DataTypes.INTEGER,
    segmentBrandId: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'segment',
    tableName: 'segments'
  });
  return segment;
};