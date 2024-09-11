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

    specialization : {
        type : Datatypes.STRING,
        allowNull : false
    }
})