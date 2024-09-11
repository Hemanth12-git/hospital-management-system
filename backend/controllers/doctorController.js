const { Doctor } = require("../sequelize/models");
const DoctorValidator = require("../validators/doctorValidator");
const DoctorPresenter = require('../presenters/doctorPresenter');

class DoctorController {
    static async list(req, res, next) {
        try {
            const doctorsList = await Doctor.getAllDoctors();
            const doctorsData = doctorsList.map(doctor => new DoctorPresenter(doctor).toJSON());   
            res.send({ data: doctorsData });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    }

    static async getDoctorById(req, res, next) {
        try {
            const id = req.params.id;
            const doctor = await Doctor.getDoctorById(id);
            if (!doctor) {
                res.code(404).send({ error: "Doctor not found" });
            } else {
                res.send({ data: new DoctorPresenter(doctor).toJSON() });
            }
        } catch (error) {
            console.error(error);
            res.code(500).send({ error: "Internal Server Error" });
        }
    }

    static async createDoctor(req, res, next) {
        try {
            const payload = req.body;
            const filterValidation = new DoctorValidator('create');
            
            if (!filterValidation.validate(payload)) {
                console.log('Validation Errors:', filterValidation.errors); // Log validation errors
                return res.status(400).send({ errors: filterValidation.errors });
            }
    
            const doctor = await Doctor.createDoctor(payload);
    
            res.status(201).send({
                message: "Doctor created successfully",
                data: new DoctorPresenter(doctor).toJSON()
            });
        } catch (error) {
            console.error('Error creating doctor:', error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
    
    

    static async updateDoctor(req, res, next) {
        try {
            const id = req.params.id; 
            const payload = req.body;  
            const filterValidation = new DoctorValidator('update');  

            if (!filterValidation.validate(payload)) {
                return res.status(400).send({ errors: filterValidation.errors });  
            }
    
            const [updatedRowsCount] = await Doctor.update(payload, {
                where: { id }
            });
    
            if (updatedRowsCount === 0) {
                return res.status(404).send({ error: "Doctor not found" }); 
            }
            res.send({ message: "Doctor updated successfully" });  
        } catch (error) {
            console.error('Error updating doctor:', error);
            res.status(500).send({ error: "Internal Server Error" }); 
        }
    }
    

    static async deleteDoctor(req, res, next) {
        try {
            const id = req.params.id;
            const filterValidation = new DoctorValidator('delete');
            if (!filterValidation.validate({ id })) {
                res.code(400).send({ errors: filterValidation.errors });
            } else {
                await Doctor.deleteDoctor(id);
                res.send({ message: "Doctor deleted successfully" });
            }
        } catch (error) {
            console.error(error);
            res.code(500).send({ error: "Internal Server Error" });
        }
    }
}

module.exports = DoctorController;
