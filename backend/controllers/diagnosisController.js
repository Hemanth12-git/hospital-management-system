const { Diagnosis } = require("../sequelize/models");
const DiagnosisValidator = require("../validators/diagnosisValidator");
const DiagnosisPresenter = require('../presenters/diagnosisPresenter');

class DiagnosisController {
    static async list(req, res, next) {
        try {
            const diagnosisList = await Diagnosis.getAlldiagnosis();
            const diagnosisData = diagnosisList.map(diagnosis => new DiagnosisPresenter(diagnosis).toJSON());
            res.send({ data: diagnosisData });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    }

    static async getDiagnosisById(req, res, next) {
        try {
            const id = req.params.id;
            const diagnosis = await Diagnosis.getDiagnosisById(id);
            if (!diagnosis) {
                res.status(404).send({ error: "Diagnosis not found" });
            } else {
                res.send({ data: new DiagnosisPresenter(diagnosis).toJSON() });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    }

    static async createDiagnosis(req, res, next) {
        try {
            const payload = req.body;
            const filterValidation = new DiagnosisValidator('create');
            if (!filterValidation.validate(payload)) {
                res.status(400).send({ errors: filterValidation.errors });
            } else {
                const diagnosis = await Diagnosis.createDiagnosis(payload);
                res.status(201).send({ message: "Diagnosis created successfully", data: new DiagnosisPresenter(diagnosis).toJSON() });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
    

    static async updateDiagnosis(req, res, next) {
        try {
            const id = req.params.id;
            const payload = req.body;
            const filterValidation = new DiagnosisValidator('update');
            if (!filterValidation.validate(payload)) {
                res.status(400).send({ errors: filterValidation.errors });
            } else {
                const [updatedRowsCount] = await Diagnosis.update(payload, {
                    where: { id }
                });
                if (updatedRowsCount === 0) {
                    res.status(404).send({ error: "Diagnosis not found" });
                } else {
                    res.send({ message: "Diagnosis updated successfully" });
                }
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    }

    static async deleteDiagnosis(req, res, next) {
        try {
            const id = req.params.id;
            const filterValidation = new DiagnosisValidator('delete');
            if (!filterValidation.validate({ id })) {
                res.status(400).send({ errors: filterValidation.errors });
            } else {
                const deletedRowsCount = await Diagnosis.destroy({ where: { id } });
                if (deletedRowsCount === 0) {
                    res.status(404).send({ error: "Diagnosis not found" });
                } else {
                    res.send({ message: "Diagnosis deleted successfully" });
                }
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
}

module.exports = DiagnosisController;
