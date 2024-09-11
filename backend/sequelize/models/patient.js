const {Model, Op, DataTypes}  = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    const patientSchema = require('./schema/patient')(DataTypes);

    class Patient extends Model {
        static associate(models) {
            Patient.belongsTo(models.Diagnosis, {
                foreignKey: 'diagnosis_id',
                as: 'diagnosis'
            });
    
            Patient.belongsTo(models.Doctor, {
                foreignKey: 'doctor_id',
                as: 'doctor'
            });
        }

        static async getAllPatient(data = {}) {
            try {
                const patients = await Patient.findAll({
                    order : [['name' , 'ASC']],
                });
                return patients;
            } catch(error) {
                throw error;
            }
            
        }

        static async getPatientById(id) {
            try {
                // console.log(id);
                const patient = await Patient.findOne({ where: { id: id } });
                // console.log("-------------------------------->");
                // console.log(patient);
                return patient;
            } catch (error) {
                throw error;
            }
        }
        

        static async createPatient(data = {}) {
            try {
                console.log(data);
                const patient = await Patient.create(data);
                console.log(patient)
                return patient;
            } catch(error) {
                throw error;
            }
        }

        static async updatePatient(id, data = {}) {
            try {
                const [updatedPatient] = await Patient.update(data, {where : {id}})
                return updatedPatient;
            } catch(error) {
                throw error;
            }
        }

        static async deletePatient(id) {
            try {
                await Patient.destroy({where : {id}});
            } catch(error) {
                throw error;
            }
        }
    }

    Patient.init(patientSchema, {
        sequelize,
        tableName: 'patients',
        modelName: 'Patient',
        timestamps: false,
    });
    
    return Patient;
}