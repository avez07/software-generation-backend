const mongoose = require('mongoose');

const AuthenticationSchema = new mongoose.Schema({
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
  softwareRequired: {
    type: String,
    required: true
  },
  employeeStrength: {
    type: String,
    required: true
  },
  challenges: {
    type: String,
    required: true
  },
  flag: {
    type: String,
    enum: {
        values: ['UserAuth', 'CallBack'],
        message: 'Flag must be either "UserAuth" or "CallBack"',
      },
    required: true
  }
}, { timestamps: true });

const UserAuth = mongoose.model('UserAuth', AuthenticationSchema, 'UserAuth');
module.exports = UserAuth;
