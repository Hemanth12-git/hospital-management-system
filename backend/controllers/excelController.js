const path = require('path');
const uploadQueue = require('../utils/uploadQueue');
const { validateExcelFile } = require('../validators/excelValidator');

async function handleBulkUpload(request, reply) {
    try {
        const file = request.file;

        if (!file) {
            return reply.status(400).send({ message: 'No file uploaded' });
        }

        if (!validateExcelFile(file.mimetype)) {
            return reply.status(400).send({ errors: 'Invalid file type. Only Excel files are allowed.' });
        }

        const filePath = path.join(__dirname, '../uploads', file.filename);

        await uploadQueue.add({ filePath });

        return reply.send({ message: 'File uploaded successfully and queued for processing.' });
    } catch (error) {
        console.error('Failed to add file to queue:', error);
        return reply.status(500).send({ error: 'Failed to queue file for processing.', details: error.message });
    }
}

module.exports = {
    handleBulkUpload,
};
