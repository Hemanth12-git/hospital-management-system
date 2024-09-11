module.exports = Datatypes => ({
    id : {
        type : Datatypes.BIGINT,
        allowNull : false,
        primaryKey : true
    },

    name : {
        type : Datatypes.STRING,
        allowNull : false
    },

    age : {
        type : Datatypes.INTEGER,
        allowNull : false
    },

    gender : {
        type : Datatypes.ENUM('Male', 'Female', 'Other'),
        allowNull : false
    },

    doctor_id : {
        type : Datatypes.BIGINT,
        allowNull : false
    },

    diagnosis_id : {
        type : Datatypes.ARRAY(Datatypes.BIGINT),
        allowNull : false
    }
});
