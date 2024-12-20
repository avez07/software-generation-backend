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
    specification:{
         type:String,
        default:''
    },
    graphScore:{
        type:Array,
        default:[]
    },
    UspData:{
        type:[{
            tittle:{type:String,default:''},
            content:{type:String,default:''},

        }]
    },
    Active:{
        type:Boolean,
        default:true
    }
},{versionKey:false})


module.exports = mongoose.model('Softwares',SoftAddingSechma,'Softwares')