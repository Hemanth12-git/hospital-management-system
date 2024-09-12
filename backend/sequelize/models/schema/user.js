module.exports = Datatypes => ({
    id: {
        type: Datatypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    username: {
        type: Datatypes.STRING,
        allowNull: false,
    },

    password: {
        type: Datatypes.STRING,
        allowNull: false
    },

    userType: {
        type: Datatypes.ENUM('admin', 'doctor', 'patient'),
        allowNull: false
    },

    patient_id: {
        type: Datatypes.BIGINT,
        allowNull: true
    },

    createdAt: {
        type: Datatypes.DATE,
        allowNull: false,
        defaultValue: Datatypes.NOW
    },

    updatedAt: {
        type: Datatypes.DATE,
        allowNull: false,
        defaultValue: Datatypes.NOW
    }
});
