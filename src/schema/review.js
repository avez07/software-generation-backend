const mongoose = require('mongoose');
const moment = require('moment')

const UserReviewModel = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
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
  JobTittle :{
    type:String,
    required : true
  },
  SoftwareName :{
    type:String,
    required : true
  },
  
  SoftwareUsage: {
    type: String,
    required: true
  },
  UIUX: {
    type: Number,
    required: true
  },
  FeatuersFunc: {
    type: Number,
    required: true
  },
   Performance: {
    type: Number,
    required: true
  },
  ValueForMoney : {
    type: Number,
    required: true
  },
   CustomerSupport: {
    type: Number,
    required: true
  },
   Integration: {
    type: Number,
    required: true
  },
  ReportingAnalytics: {
    type: Number,
    required: true
  }

 
}, { timestamps: true });

const UserReview = mongoose.model('UserReview', UserReviewModel, 'UserReview');
module.exports = UserReview;
