const doctorController = require('../controllers/doctorController');
const authenticate = require('../middleware/Authentication');

class doctorRoutes {
    static async routes(fastify) {
        fastify.get('/doctors', { preHandler: [authenticate] }, doctorController.list);
        fastify.get('/doctors/:id', { preHandler: [authenticate] }, doctorController.getDoctorById);
        fastify.post('/doctors', { preHandler: [authenticate] }, doctorController.createDoctor);
        fastify.put('/doctors/:id', { preHandler: [authenticate] }, doctorController.updateDoctor);
        fastify.delete('/doctors/:id', { preHandler: [authenticate] }, doctorController.deleteDoctor);
    }
}

module.exports = doctorRoutes.routes;
