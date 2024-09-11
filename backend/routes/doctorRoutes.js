const doctorController = require('../controllers/doctorController');

class doctorRoutes {
    static async routes(fastify) {
        fastify.get('/doctors', doctorController.list);
        fastify.get('/doctors/:id', doctorController.getDoctorById);
        fastify.post('/doctors', doctorController.createDoctor);
        fastify.put('/doctors/:id', doctorController.updateDoctor);
        fastify.delete('/doctor/:id', doctorController.deleteDoctor);
        
            
    }
}

module.exports = doctorRoutes.routes;