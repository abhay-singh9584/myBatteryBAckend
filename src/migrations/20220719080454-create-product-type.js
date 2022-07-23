'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('productTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      typeName: {
        type: Sequelize.STRING
      },
      typeIcon: {
        type: Sequelize.STRING
      },
      typeDesc: {
        type: Sequelize.STRING
      },
      typePosition: {
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
    await queryInterface.dropTable('productTypes');
  }
};