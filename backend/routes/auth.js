'use strict';

const authController = require('../controllers/authController');

async function loginRoute(fastify, options) {
  fastify.post('/api/auth/login',{}, authController.login);
}

module.exports = loginRoute;
