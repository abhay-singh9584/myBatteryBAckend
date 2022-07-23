'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('batteryDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      primaryName : {
        type : Sequelize.STRING
      },
      secondaryName : {
        type : Sequelize.STRING
      },
      productImage : {
        type : Sequelize.STRING
      },
      productMediaId : {
        type : Sequelize.INTEGER
      },
      brandId: {
        type: Sequelize.INTEGER
      },
      modelId: {
        type: Sequelize.INTEGER
      },
      groupId: {
        type: Sequelize.INTEGER
      },
      oemModelId: {
        type: Sequelize.INTEGER
      },
      schemeId: {
        type: Sequelize.INTEGER
      },
      segmentId: {
        type: Sequelize.INTEGER
      },
      productTypeId : {
        type : Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER
      },
      modelDimensionId : {
        type : Sequelize.INTEGER
      },
      productPricingId : {
        type : Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('batteryDetails');
  }
};