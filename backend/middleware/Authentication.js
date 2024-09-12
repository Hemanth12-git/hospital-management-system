const jwt = require('jsonwebtoken');

const authenticate = async (req, reply) => {
  const authHeader = req.headers['authorization']; 
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    return reply.status(401).send({ success: false, message: 'No token provided' });
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    const decoded = jwt.verify(token, secretKey); 

    req.user = decoded; 
    return; 
  } catch (err) {
    console.error(err);
    reply.status(401).send({ success: false, message: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
