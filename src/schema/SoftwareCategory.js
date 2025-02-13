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
    TableContent:{
        type:Array,
        default:[]
    },
    position: {
        type: Number,
        default:1,
    },
    MetaKeyWords: {
        type: Array,
    },
    MetaDiscription: {
        type: String,
    },
    MetaTittle: {
        type: String,
    },
    TableCaparison: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Softwares' // Ensure this matches the model name exactly
        }
    ],
    Active:{
        type:Boolean,
        default:false
    }
        
    
},{versionKey:false})
SoftCAtegorySechma.index({slug:1})
SoftCAtegorySechma.index({CategoryName:1});


module.exports = mongoose.model('SoftwareCategory',SoftCAtegorySechma,'SoftwareCategory')

