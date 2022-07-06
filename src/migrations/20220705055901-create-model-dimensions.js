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
      modelName: {
        type: Sequelize.STRING
      },
      modelDesc: {
        type: Sequelize.STRING
      },
      modelIcon: {
        type: Sequelize.STRING
      },
      modelPosition: {
        type: Sequelize.INTEGER
      },
      length: {
        type: Sequelize.INTEGER
      },
      width: {
        type: Sequelize.INTEGER
      },
      height: {
        type: Sequelize.INTEGER
      },
      layout: {
        type: Sequelize.INTEGER
      },
      acidIndicator: {
        type: Sequelize.INTEGER
      },
      currentCapacity: {
        type: Sequelize.INTEGER
      },
      mrp: {
        type: Sequelize.INTEGER
      },
      mop: {
        type: Sequelize.INTEGER
      },
      dp: {
        type: Sequelize.INTEGER
      },
      nlc: {
        type: Sequelize.INTEGER
      },
      warranty: {
        type: Sequelize.INTEGER
      },
      warrantyDesc: {
        type: Sequelize.STRING
      },
      weight: {
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
    await queryInterface.dropTable('modelDimensions');
  }
};