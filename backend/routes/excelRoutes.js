const excelController = require('../controllers/excelController');
const multer = require('fastify-multer');

const upload = multer({ dest: './uploads/' });

module.exports = function (fastify, opts, done) {
  fastify.post('/bulk-upload', { preHandler: upload.single('file') }, excelController.handleBulkUpload);
  done();
};
