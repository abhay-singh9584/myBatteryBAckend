'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('segments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      segmentName: {
        type: Sequelize.STRING
      },
      segmentDesc: {
        type: Sequelize.STRING
      },
      segmentIcon: {
        type: Sequelize.STRING
      },
      segmentPosition: {
        type: Sequelize.INTEGER
      },
      segmentBrandId: {
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
    await queryInterface.dropTable('segments');
  }
};