const Joi = require('joi');
const BaseValidator = require('./baseValidator');
const { isEmpty } = require('lodash');

class DiagnosisValidator extends BaseValidator {
    constructor(action) {
        super(action);
    }

    static createOrUpdateValidator() {
        return Joi.object({
            id: Joi.number().required().messages({
                'number.base': 'ID must be a number.',
                'any.required': 'ID is required.'
            }),
            disease: Joi.string().required().messages({
                'string.empty': 'Disease name is required and must be a non-empty string.'
            }),
            severity: Joi.string().valid('Casual', 'Moderate', 'Severe').required().messages({
                'any.only': 'Severity must be "Casual", "Moderate", or "Severe".'
            }),
            prescription: Joi.array().items(Joi.string()).required().messages({
                'array.base': 'Medicine prescription must be a non-empty array of strings.'
            }),
            additional_info: Joi.string().optional().messages({
                'string.base': 'Additional info must be a string.'
            })
        });
    }

    validate(data) {
        if (['create', 'update'].includes(this.action)) {
            const schema = DiagnosisValidator.createOrUpdateValidator();
            return super.validate(data, schema);
        }
        return true;
    }
}

module.exports = DiagnosisValidator;
