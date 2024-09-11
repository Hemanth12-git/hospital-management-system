'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('diagnosis-table', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      disease: {
        type: Sequelize.STRING,
        allowNull: false
      },
      severity: {
        type: Sequelize.ENUM('Casual', 'Moderate', 'Severe'),
        allowNull: false
      },
      prescription: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
      },
      additional_info: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('diagnosis-table');
  }
};
