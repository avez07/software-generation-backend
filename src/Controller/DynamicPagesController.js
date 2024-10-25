const CustomError = require('../utils/customerror')
const asyncErrorHandller = require('../utils/asyncErrorHandller')
const SoftwareCategory = require('../schema/SoftwareCategory')
const he = require("he");




const AddCategory = asyncErrorHandller(async(req,res,next)=>{
    const {  SlugName,CategoryName,discription ,BuyersGuide,Camparision} = req.body
    const filter = {
        slug: new RegExp(`^${SlugName}$`, "i"), // Case-insensitive for field1
        CategoryName: new RegExp(`^${CategoryName}$`, "i"), // Case-insensitive for field2
      };
      const update = { $set: {slug:SlugName,CategoryName:CategoryName, Discription:he.encode(discription),BuyerGuide: he.encode(BuyersGuide),TableCaparison:Camparision } };
    const Data = await SoftwareCategory.findOneAndUpdate(filter,update,{upsert:true,returnOriginal:false})
    res.status(200).json({status:200,message:'success',documentId: Data?._id,})
})
module.exports = {AddCategory}