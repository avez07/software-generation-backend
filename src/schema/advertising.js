const mongoose = require('mongoose');
const moment = require('moment')

const Adveriting = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true,
    },
    ImageLink: {
        type: String,
        required: true,
    },
    Techscout_Verifyed: {
        type: Boolean,
        required: true,
        default: false
    },

    Trusted_Percentage: {
        type: String,
        required: true
    },
    RatingStars: {
        type: String,
        required: true
    },
    Onwords: {
        type: String,
        required: true
    },
    Website_Link: {
        type: String,
        required: true
    },
    CategoryLinked: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SoftwareCategory' // Ensure this matches the model name exactly
        }
    ],
    Active: {
        type: Boolean,
        default: false
    },

}, { timestamps: true });

const Adverties = mongoose.model('adveriting', Adveriting, 'adveriting');
module.exports = Adverties;
