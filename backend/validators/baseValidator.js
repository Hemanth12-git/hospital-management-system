const { isEmpty } = require('lodash');
const Joi = require('joi');

class BaseValidator {
    constructor(action) {
        this.action = action;
        this.errors = [];
        this.isValid = null;
        this.value = null;
    }

    validate(data, schema, convert = true) {
        if (isEmpty(data)) {
            this.errors = ['Empty data - nothing to validate.'];
            this.isValid = false;
        } else {
            const { error, value } = schema.validate(data, { convert });
            if (error) {
                this.errors = error.details.map((err) => err.message);
                this.isValid = false;
            } else {
                this.value = value;
                this.errors = [];
                this.isValid = true;
            }
        }
        return this.isValid;
    }
}

module.exports = BaseValidator;
