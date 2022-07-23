'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('productModels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      modelName: {
        type: Sequelize.STRING
      },
      modelIcon: {
        type: Sequelize.STRING
      },
      modelDesc: {
        type: Sequelize.STRING
      },
      modelPosition: {
        type: Sequelize.INTEGER
      },
      brandId: {
        type: Sequelize.INTEGER
      },
      groupId: {
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
    await queryInterface.dropTable('productModels');
  }
};