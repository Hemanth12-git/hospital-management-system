const xlsx = require('xlsx');

class ExcelParser {
    constructor(file) {
        this.file = file;
    }

    async toJson() {
        try {
            const workbook = xlsx.readFile(this.file); 

            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const jsonData = xlsx.utils.sheet_to_json(sheet);
            console.log('Parsed JSON Data:', jsonData);

            return jsonData;
        } catch (error) {
            console.error('Error parsing Excel file:', error);
            throw new Error('Error parsing Excel file');
        }
    }
}

module.exports = ExcelParser;
