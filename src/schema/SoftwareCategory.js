const mongoose = require('mongoose')

const SoftCAtegorySechma = new mongoose.Schema({
    slug:{
        type:String,
        unique:true,
        index:true,
        required:true
    },
    CategoryName:{
        type:String,
        unique:true,
        index:true,
        required:true,
    },
    Discription:{
        type:String,
        maxlength:[1000,'Max Length Exceeded']
    },
    BuyerGuide:{
        type: String
    },
    TableCaparison: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Softwares'
        }],
        default:[]
    }
})
SoftCAtegorySechma.index({slug:1})
SoftCAtegorySechma.index({CategoryName:1});


module.exports = mongoose.model('SoftwareCategory',SoftCAtegorySechma,'SoftwareCategory')

