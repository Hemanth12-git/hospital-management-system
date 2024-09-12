'use strict';

const { User } = require('../sequelize/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');

// dotenv.config()

exports.login = async (req, reply) => {
  const { username, password, userType } = req.body;
  try {
    const user = await User.findOne({
      attributes: ['id', 'username','password', 'userType'],
      where: {
        username: username,
        userType: userType
      }
    });
    // console.log(user.dataValues)

    if (!user) {
      return reply.status(401).send({ success: false, message: 'User not found' });
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = password == user.password;
    console.log(isPasswordValid)

    if (!isPasswordValid) {
      return reply.status(401).send({ success: false, message: 'Invalid password' });
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(
      { username: user.username, userType: user.userType },
      secretKey,
      { expiresIn: '1h' }
    );

    // reply.cookie('authToken', token, {
    //     httpOnly: true,
    //     sameSite:'strict',
    //     secure: true
    //   });
    // localStorage.setItem('authToken',token);

    reply.status(200).send({
      success: true,
      message: 'Successfully logged in',

      data : {
        username,
        userType,
        authToken : token
      }
    });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ success: false, message: 'Internal server error' });
  }
};
