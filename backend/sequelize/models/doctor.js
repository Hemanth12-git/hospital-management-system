const {Model, Op} = require('sequelize');

module.exports = (sequelize, Datatypes) => {
    const doctorSchema = require('./schema/doctor')(Datatypes);

    class Doctor extends Model {
        static associate(models) {
            Doctor.hasMany(models.Patient, {
                foreignKey: 'doctor_id',
                as: 'patients'
            });
        }

        static async getAllDoctors(data = {}) {
            try {
                const doctors = Doctor.findAll();
                return doctors;
            } catch(error) {
                throw error;
            }
        }

        static async getDoctorById(id) {
            try {
                const doctor = Doctor.findByPk(id);
                return doctor;
            } catch(error) {
                throw error;
            }
        }

        static async createDoctor(data = {}) {
            try {
                const doctor = await Doctor.create(data);
                return doctor;
            } catch(error) {
                throw error;} 
        }

        static async updateDoctor(id, data = {}){
            try {
                const [updatedDoctor] = await Doctor.update(data, {where : {id}});
                return updatedDoctor;
            } catch(error) {
                throw error;
            }
        }

        static async deleteDoctor(id) {
            try {
                await Doctor.destroy({where : {id}});
            } catch(error) {
                throw error;
            }
        }
    }

    Doctor.init(doctorSchema, {
        sequelize,
        tableName: 'doctor-table',
        modelName: 'Doctor',
        timestamps: false,
    });

    return Doctor;
}