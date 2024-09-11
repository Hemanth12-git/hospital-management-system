const Joi = require('joi');
const BaseValidator = require('./baseValidator');
const { isEmpty } = require('lodash');

class DoctorValidator extends BaseValidator {
    constructor(action) {
        super(action);
    }

    static createOrUpdateValidator() {
        return Joi.object({
            id: Joi.number().required().messages({
                'number.base': 'ID must be a number.',
                'any.required': 'ID is required.'
            }),
            name: Joi.string().trim().required().messages({
                'string.empty': 'Name is required and must be a non-empty string.'
            }),
            specialization: Joi.string().trim().required().messages({
                'string.empty': 'Specialization is required and must be a non-empty string.'
            })
        });
    }

    validate(data) {
        if (['create', 'update'].includes(this.action)) {
            const schema = DoctorValidator.createOrUpdateValidator();
            return super.validate(data, schema);
        }
        return true;
    }
}

module.exports = DoctorValidator;
