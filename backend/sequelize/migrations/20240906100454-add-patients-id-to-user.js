'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'patients_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // Adjust as per your requirements
      references: {
        model: 'patients', // Name of the referenced table (Patients)
        key: 'id'          // Column in Patients table being referenced
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'patients_id');
  }
};
