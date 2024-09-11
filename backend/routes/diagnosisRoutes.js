const diagnosisController = require('../controllers/diagnosisController');

class diagnosisRoutes {
    static async routes(fastify) {
        fastify.get('/diagnosis', diagnosisController.list);
        fastify.get('/diagnosis/:id', diagnosisController.getDiagnosisById);
        fastify.post('/diagnosis', diagnosisController.createDiagnosis);
        fastify.put('/diagnosis/:id', diagnosisController.updateDiagnosis);
        fastify.delete('/diagnosis/:id', diagnosisController.deleteDiagnosis);
    }
}

module.exports = diagnosisRoutes.routes;