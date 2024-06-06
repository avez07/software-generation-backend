const mongoose = require('mongoose');
const moment = require('moment')

const freeDemoModel = new mongoose.Schema({
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
  softwareCategory: {
    type: String,
    required: true
  },
  softwareName: {
    type: String,
    required: true
  },
  employeeStrength: {
    type: String,
    required: true
  },
  preferedDemoDate: {
    type: String,
    required: true,
    validate: {
        validator: function(value) {
          // Allowing the schema to handle various date formats
          return moment(value, 'DD-MM-YYYY', true).isValid();
        },
        message: props => `${props.value} is not a valid date. Expected format: DD-MM-YYYY`
      }
  }
 
}, { timestamps: true });

const freeDemo = mongoose.model('freeDemo', freeDemoModel, 'freeDemo');
module.exports = freeDemo;
