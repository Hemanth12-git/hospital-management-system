'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Remove existing foreign key constraints
    await queryInterface.removeConstraint('patients', 'patients_diagnosis_id_fkey');
    await queryInterface.removeConstraint('patients', 'patients_doctor_id_fkey');
  },

  async down (queryInterface, Sequelize) {
    // Re-add foreign key constraints
    await queryInterface.addConstraint('patients', {
      fields: ['diagnosis_id'],
      type: 'foreign key',
      name: 'patients_diagnosis_id_fkey',
      references: {
        table: 'diagnosis-table',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

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
  }
};
