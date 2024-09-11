const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');
const { sequelize } = require('./config/db');
const dotenv = require('dotenv');

dotenv.config()

fastify.register(cors, { 
    origin: '*', 
});

fastify.register(require('./routes/patientRoutes'), { prefix: '/api/patients' });
fastify.register(require('./routes/doctorRoutes'), { prefix: '/api/doctors' });
fastify.register(require('./routes/diagnosisRoutes'), { prefix: '/api/diagnosis' });
fastify.register(require('./routes/auth'));

fastify.get('/', async (req, res) => {
    res.send('Welcome to the Hospital Management System');
});

fastify.setNotFoundHandler((request, reply) => {
    reply.status(404).send({ error: 'Not Found' });
});

fastify.setErrorHandler((error, request, reply) => {
    request.log.error(error);
    reply.status(500).send({ error: 'Internal Server Error' });
});

fastify.listen({ port: 3000 }, async (err) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }

    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully');
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }

    console.log('Server running at http://localhost:3000');
});
