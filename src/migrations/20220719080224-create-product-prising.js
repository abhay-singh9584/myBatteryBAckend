'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('productPricings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mrpIcon: {
        type: Sequelize.STRING
      },
      mrpUnit: {
        type: Sequelize.STRING
      },
      mrpValue: {
        type: Sequelize.INTEGER
      },
      mopIcon: {
        type: Sequelize.STRING
      },
      mopUnit: {
        type: Sequelize.STRING
      },
      mopValue: {
        type: Sequelize.INTEGER
      },
      dpIcon: {
        type: Sequelize.STRING
      },
      dpUnit: {
        type: Sequelize.STRING
      },
      dpValue: {
        type: Sequelize.INTEGER
      },
      nlcIcon: {
        type: Sequelize.STRING
      },
      nlcUnit: {
        type: Sequelize.STRING
      },
      nlcValue: {
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
    await queryInterface.dropTable('productPricings');
  }
};