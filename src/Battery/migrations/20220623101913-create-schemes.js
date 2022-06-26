'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('schemes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      schemeName: {
        type: Sequelize.STRING
      },
      schemeType: {
        type: Sequelize.STRING
      },
      schemeDesc: {
        type: Sequelize.STRING
      },
      schemeUrl: {
        type: Sequelize.STRING
      },
      schemeGroup: {
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
    await queryInterface.dropTable('schemes');
  }
};