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
      secondaryNameId: {
        type: Sequelize.INTEGER
      },
      segmentId: {
        type: Sequelize.INTEGER
      },
      subCategoryId: {
        type: Sequelize.INTEGER
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