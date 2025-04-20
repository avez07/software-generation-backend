const mongoose = require('mongoose');
const moment = require('moment')

const Contact = new mongoose.Schema({
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
  Message: {
    type: String,
    required: true
  },
  FeildName: {
    type: String,
    required: true
  }

  
 
}, { timestamps: true ,versionKey:false},);

const contact = mongoose.model('contact', Contact, 'contact');
module.exports = contact;