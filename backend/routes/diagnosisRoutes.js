const diagnosisController = require('../controllers/diagnosisController');
const authenticate = require('../middleware/Authentication');

class diagnosisRoutes {
    static async routes(fastify) {
        fastify.get('/diagnosis', { preHandler: [authenticate] }, diagnosisController.list);
        fastify.get('/diagnosis/:id', { preHandler: [authenticate] }, diagnosisController.getDiagnosisById);
        fastify.post('/diagnosis', { preHandler: [authenticate] }, diagnosisController.createDiagnosis);
        fastify.put('/diagnosis/:id', { preHandler: [authenticate] }, diagnosisController.updateDiagnosis);
        fastify.delete('/diagnosis/:id', { preHandler: [authenticate] }, diagnosisController.deleteDiagnosis);
    }
}

module.exports = diagnosisRoutes.routes;
