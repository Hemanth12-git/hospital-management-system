// worker/processFile.js
const xlsx = require('xlsx');
const { Doctor } = require('../sequelize/models');

const processFile = async (filePath) => {
    try {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);

        const validData = data.map(row => ({
            id: row.id,
            name: row.name,
            specialization: row.specialization
        })).filter(row => row.id && row.name && row.specialization);

        if (validData.length > 0) {
            await Doctor.bulkCreate(validData, { validate: true });
        }

        return { status: 'success', message: 'Data successfully uploaded and stored.' };
    } catch (error) {
        throw new Error('Error processing file: ' + error.message);
    }
};

module.exports = { processFile };
