const CustomError = require('../utils/customerror')
const asyncErrorHandller = require('../utils/asyncErrorHandller')
const SoftwareCategory = require('../schema/SoftwareCategory')

const he = require("he");
const softewareAdding = require('../schema/softewareAdding');




const AddCategory = asyncErrorHandller(async (req, res, next) => {
  const { SlugName, CategoryName, discription, BuyersGuide, Camparision } = req.body
  const filter = {
    slug: new RegExp(`^${SlugName}$`, "i"), // Case-insensitive for field1
    CategoryName: new RegExp(`^${CategoryName}$`, "i"), // Case-insensitive for field2
  };
  const update = { $set: { slug: SlugName, CategoryName: CategoryName, Discription: he.encode(discription), BuyerGuide: he.encode(BuyersGuide), TableCaparison: Camparision } };
  const Data = await SoftwareCategory.findOneAndUpdate(filter, update, { upsert: true, returnOriginal: false })
  res.status(200).json({ status: 200, message: 'success', documentId: Data?._id, })
})
const FetchCategory = asyncErrorHandller(async (req, res, next) => {

  const Data = await SoftwareCategory.find({}).lean()
  const MappingData = Data.map((item) => {

    item.BuyerGuide = he.decode(item.BuyerGuide);
    item.Discription = he.decode(item.Discription);
    return { ...item };
  });
  res.status(200).json({ status: 200, message: 'success', data: MappingData, })
})
const AddSoftware = asyncErrorHandller(async(req,res,nex)=>{
const {CategordId,SoftwareName,SubTittle,discription,SoftWareQA,KeyFeatures,UspData} = req.body
const encodedUspData = UspData.map(item => ({
  ...item,
  content: he.encode(item.content)
}));
const filter = {SoftwareName:SoftwareName}
const update = {$set:{
  CategordId:CategordId,
  SoftwareName:SoftwareName,
  SubTittle:SubTittle,
  discription:he.encode(discription),
  SoftWareQA:he.encode(SoftWareQA),
  KeyFeatures:KeyFeatures,
  UspData:encodedUspData
}}
const response = await softewareAdding.findOneAndUpdate(filter,update,{upsert:true,returnOriginal:false})
res.status(200).json({ status: 200, message: 'success', documentId: response?._id, })
})
const FetchSofteares = asyncErrorHandller(async (req, res, next) => {

  const Data = await softewareAdding.find({}).lean()
  const MappingData = Data.map((item) => {
    const encodedUspData = item.UspData.map(items => ({
      ...items,
      content: he.decode(items.content)
    }));

    item.SoftWareQA = he.decode(item.SoftWareQA);
    item.discription = he.decode(item.discription);
    item.UspData = encodedUspData
    return { ...item };
  });
  res.status(200).json({ status: 200, message: 'success', data: MappingData, })
})
module.exports = { AddCategory, FetchCategory ,AddSoftware,FetchSofteares}