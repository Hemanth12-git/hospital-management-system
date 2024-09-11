const { Model, Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const diagnosisSchema = require('./schema/diagnosis')(DataTypes);

    class Diagnosis extends Model {
        static associate(models) {
            Diagnosis.hasOne(models.Patient, {
                foreignKey: 'diagnosis_id',
                as: 'patient'
            });
        }

        static async getAlldiagnosis(data = {}) {
            try {
                const diagnosis = await Diagnosis.findAll();
                return diagnosis;
            } catch (error) {
                throw error;
            }
        }

        static async getDiagnosisById(id) {
            try {
                const diagnosis = await Diagnosis.findByPk(id);
                return diagnosis;
            } catch (error) {
                throw error;
            }
        }

        static async createDiagnosis(data = {}) {
            try {
                const diagnosis = await Diagnosis.create(data);
                return diagnosis;
            } catch (error) {
                throw error;
            }
        }

        static async updateDiagnosis(id, data = {}) {
            try {
                const [updatedDiagnosis] = await Diagnosis.update(data, { where: { id } });
                return updatedDiagnosis;
            } catch (error) {
                throw error;
            }
        }

        static async deleteDiagnosis(id) {
            try {
                const deletedDiagnosis = await Diagnosis.destroy({ where: { id } });
                return deletedDiagnosis;
            } catch (error) {
                throw error;
            }
        }
    }

    Diagnosis.init(diagnosisSchema, {
        sequelize,
        tableName: 'diagnosis-table',
        modelName: 'Diagnosis',
        timestamps: false,
    });

    return Diagnosis;
};
