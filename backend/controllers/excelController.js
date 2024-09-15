const { Doctor } = require('../sequelize/models');
const { validateExcelFile } = require('../validators/excelValidator');
const ExcelParser = require('../lib/excelParser');

async function handleBulkUpload(request, reply) {
    try {
        const file = request.file;

        if (!file) {
            return reply.status(400).send({ message: 'No file uploaded' });
        }

        if (!validateExcelFile(file.mimetype)) {
            return reply.status(400).send({ errors: 'Invalid file type. Only Excel files are allowed.' });
        }

        const excelParser = new ExcelParser(file.path); 
        const usersData = await excelParser.toJson();
        
        const validData = usersData.map(row => ({
            id: row.id,
            name: row.name,
            specialization: row.specialization
        })).filter(row => row.id && row.name && row.specialization);

        if (validData.length === 0) {
            return reply.status(400).send({ message: 'No valid data to upload' });
        }

        await Doctor.bulkCreate(validData, { validate: true });

        return reply.send({ message: 'Users data successfully uploaded and stored.' });
    } catch (error) {
        console.error('Failed to process the uploaded file:', error);
        return reply.status(500).send({ error: 'Failed to process the uploaded file.', details: error.message });
    }
}

module.exports = {
    handleBulkUpload,
};
