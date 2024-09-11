'use strict';

const { User } = require('../sequelize/models');
// const bcrypt = require('bcrypt');

async function loginRoute(fastify, options) {
  fastify.post('/api/auth/login', async (request, reply) => {
    const { username, password, userType } = request.body;
    try {
      const user = await User.findOne({
        attributes: ['id', 'username', 'password', 'usertype', 'patient_id'],
        where: {
          username: username,
          usertype: userType
        }
      });

      // console.log(user);
      // console.log("-----------------------------------");

      if (!user) {
        return reply.status(401).send({ success: false, message: 'User not found' });
      }
      // const isPasswordValid = await bcrypt.compare(password, user.password);
      const isPasswordValid = password === user.password; 

      if (!isPasswordValid) {
        return reply.status(401).send({ success: false, message: 'Invalid password' });
      }

      reply.send({
        success: true,
        data: {
          username: user.username,
          userType: user.usertype
        }
      });
    } catch (error) {
      console.error(error); 
      reply.status(500).send({ success: false, message: 'Internal server error' });
    }
  });
}

module.exports = loginRoute;
