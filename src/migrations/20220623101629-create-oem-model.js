'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('oem_models', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      OEMModelName: {
        type: Sequelize.STRING
      },
      FuelType: {
        type: Sequelize.STRING
      },
      OEMModelImage: {
        type: Sequelize.STRING
      },
      OEMModelPosition: {
        type: Sequelize.INTEGER
      },
      OEMBrandId: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('oem_models');
  }
};