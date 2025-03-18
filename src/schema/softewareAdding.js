const mongoose = require('mongoose')

const SoftAddingSechma = new mongoose.Schema({
    CategordId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'SoftwareCategory',
        require: true,
    },
    SoftwareName: {
        type: String,
        require: true,
    },
    SubTittle: {
        type: String,
        require: true,
    },
    Image: {
        type: String,
        default: ''
    },
    discription: {
        type: String,
        require: true,
    },
    SoftWareQA: {
        type: String,
        require: true,
    },
    KeyFeatures: {
        type: Array,
        require: true,
    },
    specification: {
        type: String,
    },
    WebsiteLink: {
        type: String,
        default: ''
    },
    specData: {
        type: Array,
        default: []
    },
    position: {
        type: Number,
    },
    MetaKeyWords: {
        type: Array,
        default: []
    },
    MetaDiscription: {
        type: String,
        default: ''

    },
    MetaTittle: {
        type: String,
        default: ''

    },
    graphScore: {
        type: Array,
        default: []
    },
    UspData: {
        type: [{
            tittle: { type: String, default: '' },
            content: { type: String, default: '' },

        }]
    },
    PricingData: {
        type: [{
            tittle: { type: String, default: '' },
            subtittle: { type: String, default: '' },
            Amount: { type: String, default: '' },
            bulletPoint: { type: Array, default: [] },
        }]
    },
    Active: {
        type: Boolean,
        default: true
    }
}, { versionKey: false })

SoftAddingSechma.pre('save', async function (next) {
    try {
        if (!this.isNew) return next(); // If not a new document, skip generating loginId
        const lastSoftware = await this.constructor.findOne({ CategordId: this.categoryId }, {}, { sort: { position: -1 } });
        const lastSoftwareid = lastSoftware ? lastSoftware.position : 1;
        this.position = lastSoftwareid + 1; // Assign the next available loginId
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Softwares', SoftAddingSechma, 'Softwares')