'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('modelDimensions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lengthUnit: {
        type: Sequelize.STRING
      },
      lengthValue: {
        type: Sequelize.INTEGER
      },
      widthUnit: {
        type: Sequelize.STRING
      },
      widthValue: {
        type: Sequelize.INTEGER
      },
      heightUnit: {
        type: Sequelize.STRING
      },
      heightValue: {
        type: Sequelize.INTEGER
      },
      layoutValue: {
        type: Sequelize.INTEGER
      },
      acidIndicatorUnit: {
        type: Sequelize.STRING
      },
      acidIndicatorValue: {
        type: Sequelize.INTEGER
      },
      currentCapacityUnit: {
        type: Sequelize.STRING
      },
      currentCapacityValue: {
        type: Sequelize.INTEGER
      },
      weightUnit: {
        type: Sequelize.STRING
      },
      weightValue: {
        type: Sequelize.INTEGER
      },
      warrantyUnit: {
        type: Sequelize.STRING
      },
      warrantyValue: {
        type: Sequelize.INTEGER
      },
      warrantyDesc: {
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
    await queryInterface.dropTable('modelDimensions');
  }
};