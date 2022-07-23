const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      category.hasOne(models.subcategory,{
        sourceKey :'subCategoryId',
        foreignKey :'id'
      }) 
    }
  }
  category.init({
    categoryName: DataTypes.STRING,
    categoryDesc: DataTypes.STRING,
    categoryIcon: DataTypes.STRING,
    categoryPosition: DataTypes.INTEGER,
    subCategoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'category',
    tableName: 'categories',
  });
  return category;
};