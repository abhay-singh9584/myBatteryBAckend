'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('oem_brands', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      OEMBrand: {
        type: Sequelize.STRING
      },
      OEMBrandImage: {
        type: Sequelize.STRING
      },
      OEMB: {
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
    await queryInterface.dropTable('oem_brands');
  }
};