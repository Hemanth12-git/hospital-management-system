const patientController = require("../controllers/patientController");

class patientRoutes {
    static async routes(fastify) {
        fastify.get('/patient', patientController.list);
        fastify.get('/patients/:id', patientController.getPatientById);
        fastify.post('/patients', patientController.createPatient);
        fastify.put('/patients/:id', patientController.updatePatient);
        fastify.delete('/patients/:id', patientController.deletePatient);
        fastify.get('/patients/:id/diagnosis', patientController.getdiagnosisByPatientId);
    }
}   

module.exports = patientRoutes.routes;
