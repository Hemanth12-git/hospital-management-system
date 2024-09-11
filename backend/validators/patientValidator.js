const Joi = require('joi');
const BaseValidator = require('./baseValidator');
const { isEmpty } = require('lodash');

class PatientValidator extends BaseValidator {
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
            age: Joi.number().positive().required().messages({
                'number.base': 'Age must be a positive number.',
                'number.positive': 'Age must be greater than 0.'
            }),
            gender: Joi.string().valid('Male', 'Female', 'Other').required().messages({
                'any.only': 'Gender must be either "Male", "Female", or "Other".'
            }),
            doctor_id: Joi.number().required().messages({
                'number.base': 'Doctor ID must be a number.',
                'any.required': 'Doctor ID is required.'
            }),
            diagnosis_id: Joi.array().items(Joi.number()).required().messages({
                'array.base': 'Diagnosis ID must be an array of numbers.',
                'any.required': 'Diagnosis ID is required.'
            })
        });
    }

    validate(data) {
        if (['create', 'update'].includes(this.action)) {
            const schema = PatientValidator.createOrUpdateValidator();
            return super.validate(data, schema);
        }
        return true;
    }
}

module.exports = PatientValidator;
