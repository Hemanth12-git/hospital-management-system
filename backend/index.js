const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');
const { sequelize } = require('./config/db');
// const cookie = require('@fastify/cookie');
// const jwt =require('@fastify/jwt');
const dotenv = require('dotenv');

dotenv.config()

fastify.register(cors, { 
    origin: '*', 
});
// fastify.register(cookie);
// fastify.register(jwt,{secret : "i_am_hemanth"});
// fastify.register(require('@fastify/cookie'), {
//   secret: "my-secret", // for cookies signature
// //   hook: 'onRequest', // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
//   parseOptions: {}  // options for parsing cookies
// })

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
