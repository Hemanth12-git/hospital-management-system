const patientController = require("../controllers/patientController");
const authenticate = require('../middleware/Authentication');

class patientRoutes {
    static async routes(fastify) {
        fastify.get('/patients', { preHandler: [authenticate] }, patientController.list);
        fastify.get('/patients/:id', { preHandler: [authenticate] }, patientController.getPatientById);
        fastify.post('/patients', { preHandler: [authenticate] }, patientController.createPatient);
        fastify.put('/patients/:id', { preHandler: [authenticate] }, patientController.updatePatient);
        fastify.delete('/patients/:id', { preHandler: [authenticate] }, patientController.deletePatient);
        fastify.get('/patients/:id/diagnosis', { preHandler: [authenticate] }, patientController.getdiagnosisByPatientId);
    }
}

module.exports = patientRoutes.routes;
