const mongoose = require('mongoose')

const SoftAddingSechma = new mongoose.Schema({
    CategordId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
    },
    SoftwareName: {
        type:String,
        require:true,
    },
    SubTittle:{
        type:String,
        require:true,
    },
    Image:{
        type:String,
        default:''
    },
    discription: {
        type:String,
        require:true,
    },
    SoftWareQA:{
        type:String,
        require:true,
    },
    KeyFeatures:{
        type:Array,
        require:true,
    },
    UspData:{
        type:[{
            tittle:{type:String,default:''},
            content:{type:String,default:''},

        }]
    }
},{versionKey:false})


module.exports = mongoose.model('Softwares',SoftAddingSechma,'Softwares')