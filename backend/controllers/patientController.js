const { Patient } = require("../sequelize/models");
const PatientValidator = require("../validators/patientValidator");
const PatientPresenter = require('../presenters/patientPresenter');
const { Diagnosis } = require('../sequelize/models');

class PatientController {
    static async list(req, res, next) {
        try {
            const queryParams = req.query;
            const filterValidation = new PatientValidator('list');
            if (!filterValidation.validate(queryParams)) {
                res.code(400).send({ errors: filterValidation.errors });
            } else {
                const patientsData = [];
                const patientsList = await Patient.getAllPatient(queryParams);
                patientsList.forEach((patientListData) => {
                    patientsData.push(new PatientPresenter(patientListData).toJSON());
                });
                res.send({ data: patientsData });
            }
        } catch (error) {
            console.error(error);
            res.code(500).send({ error: "Internal Server Error" });
        }
    }

    static async getPatientById(req, res, next) {
        try {
            const stringid = req.params.id;
            const num = Number(stringid);
            // console.log(id);
            const patient = await Patient.getPatientById(num);
            // console.log(patient);
            if (!patient) {
                res.code(404).send({ error: "Patient not found" });
            } else {
                res.send({ data: new PatientPresenter(patient).toJSON() });
            }
        } catch (error) {
            console.error(error);
            res.code(500).send({ error: "Internal Server Error" });
        }
    }

    static async createPatient(req, res, next) {
        try {
            const payload = req.body;
            const filterValidation = new PatientValidator('create');
            if (!filterValidation.validate(payload)) {
                res.status(400).send({ errors: filterValidation.errors });
            } else {
                const patient = await Patient.createPatient({ ...payload });
                res.status(201).send({ message: "Patient created successfully", data: new PatientPresenter(patient).toJSON() });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
    

    static async updatePatient(req, res, next) {
        try {
            const id = req.params.id;
            const payload = req.body;
            const filterValidation = new PatientValidator('update');
            if (!filterValidation.validate(payload)) {
                res.code(400).send({ errors: filterValidation.errors });
            } else {
                const updatedPatient = await Patient.updatePatient(id, { ...payload, updated_at: new Date() });
                if (!updatedPatient) {
                    res.code(404).send({ error: "Patient not found" });
                } else {
                    res.send({ message: "Patient updated successfully" });
                }
            }
        } catch (error) {
            console.error(error);
            res.code(500).send({ error: "Internal Server Error" });
        }
    }

    static async deletePatient(req, res, next) {
        try {
            const id = req.params.id;
            const filterValidation = new PatientValidator('delete');
            if (!filterValidation.validate({ id })) {
                res.code(400).send({ errors: filterValidation.errors });
            } else {
                await Patient.deletePatient(id);
                res.send({ message: "Patient deleted successfully" });
            }
        } catch (error) {
            console.error(error);
            res.code(500).send({ error: "Internal Server Error" });
        }
    }

    static async getdiagnosisByPatientId(req, reply) {
        const { id } = req.params;
        console.log(id);
        try {
            const patient = await Patient.findOne({
                where: { id }
            });

            if (!patient) {
                return reply.status(404).send('Patient not found');
            }

            const diagnosis_id = patient.diagnosis_id;
            console.log(diagnosis_id)
            if (!diagnosis_id || diagnosis_id.length === 0) {
                return reply.send({ data: [] });
            }

            const diagnosis = await Diagnosis.findAll({
                where: {
                    id: diagnosis_id
                }
            });

            reply.send({ data: diagnosis });
        } catch (error) {
            console.error(error);
            reply.status(500).send('Error fetching diagnosis');
        }
    }
}

module.exports = PatientController;
