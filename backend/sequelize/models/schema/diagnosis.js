module.exports = Datatypes => ({
    id: {
        type: Datatypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },

    disease: {
        type: Datatypes.STRING,
        allowNull: false
    },

    severity: {
        type: Datatypes.ENUM('Casual', 'Moderate', 'Severe'),
        allowNull: false
    },

    prescription: {
        type: Datatypes.ARRAY(Datatypes.STRING),
        allowNull: false
    },

    additional_info: {
        type: Datatypes.TEXT,
        allowNull: true
    },

    
});
