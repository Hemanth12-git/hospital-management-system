module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Step 1: Add a new temporary column for diagnosis_id with ARRAY type
    await queryInterface.addColumn('patients', 'new_diagnosis_id', {
      type: Sequelize.ARRAY(Sequelize.BIGINT),
      allowNull: false,
      defaultValue: [] // Set a default empty array for existing records
    });

    // Step 2: Copy data from old diagnosis_id to the new column, converting it into an array
    await queryInterface.sequelize.query(`
      UPDATE "patients" 
      SET "new_diagnosis_id" = ARRAY["diagnosis_id"]
      WHERE "diagnosis_id" IS NOT NULL;
    `);

    // Step 3: Drop the old diagnosis_id column
    await queryInterface.removeColumn('patients', 'diagnosis_id');

    // Step 4: Rename the new column to diagnosis_id
    await queryInterface.renameColumn('patients', 'new_diagnosis_id', 'diagnosis_id');
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the changes if necessary
    await queryInterface.addColumn('patients', 'new_diagnosis_id', {
      type: Sequelize.BIGINT,
      allowNull: false,
    });

    await queryInterface.sequelize.query(`
      UPDATE "patients" 
      SET "new_diagnosis_id" = "diagnosis_id"[1] 
      WHERE "diagnosis_id" IS NOT NULL;
    `);

    await queryInterface.removeColumn('patients', 'diagnosis_id');
    await queryInterface.renameColumn('patients', 'new_diagnosis_id', 'diagnosis_id');
  }
};
