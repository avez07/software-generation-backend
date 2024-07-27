const mongoose = require('mongoose')

const SoftwareListedModel = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                // Custom validation logic for phone number length and digits only
                return /^\d{10}$/.test(value);
            },
            message: props => `${props.value} is not a valid phone number`
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                // Custom validation logic for email format
                return /\S+@\S+\.\S+/.test(value);
            },
            message: props => `${props.value} is not a valid email address`
        }
    },
    companyName: {
        type: String,
        required: true
    },
    websiteLink: {
        type: String,
        required: true
    },
    employeeStrength: {
        type: String,
        required: true
      }
}, { timestamps: true })

const SofwareListed = mongoose.model('softwareListed', SoftwareListedModel, 'softwareListed')

module.exports = SofwareListed