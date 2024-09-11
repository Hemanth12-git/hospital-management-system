'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add the foreign key constraint for doctor_id
    await queryInterface.addConstraint('patients', {
      fields: ['doctor_id'],
      type: 'foreign key',
      name: 'patients_doctor_id_fkey',
      references: {
        table: 'doctor-table',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    // Remove the foreign key constraint for doctor_id
    await queryInterface.removeConstraint('patients', 'patients_doctor_id_fkey');
  }
};
