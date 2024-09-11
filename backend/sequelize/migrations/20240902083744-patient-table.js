'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('patients', { 
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      age: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      gender: {
        type: Sequelize.ENUM('Male', 'Female', 'Other'),
        allowNull: false
      },

      doctor_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'doctor-table',
          key: 'id'
        }
      },

      diagnosis_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        // references: {
        //   model: 'diagnosis-table',
        //   key: 'id'
        // }
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('patients');
  }
};