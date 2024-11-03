const CustomError = require('../utils/customerror')
const multer = require('multer')
const asyncErrorHandller = require('../utils/asyncErrorHandller')
const SoftwareCategory = require('../schema/SoftwareCategory')

const he = require("he");
const softewareAdding = require('../schema/softewareAdding');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/uploads/'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Set a unique filename
  },
});
const upload = multer({ storage: storage });

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
const UpdateCategory = asyncErrorHandller(async (req, res, next) => {
  const { id, SlugName, CategoryName, discription, BuyersGuide, Camparision } = req.body
 if(!id) throw new CustomError('Id is Missing',404)
  const update = { $set: { slug: SlugName, CategoryName: CategoryName, Discription: he.encode(discription), BuyerGuide: he.encode(BuyersGuide), TableCaparison: Camparision } };
  const Data = await SoftwareCategory.findByIdAndUpdate(id, update)
  res.status(200).json({ status: 200, message: 'success', documentId: Data?._id, })
})
const FetchCategory = asyncErrorHandller(async (req, res, next) => {

  const Data = await SoftwareCategory.find({}).populate('TableCaparison','SoftwareName').lean()
  const MappingData = Data.map((item) => {

    item.BuyerGuide = he.decode(item.BuyerGuide);
    item.Discription = he.decode(item.Discription);
    return { ...item };
  });
  res.status(200).json({ status: 200, message: 'success', data: MappingData, })
})
const AddSoftware = asyncErrorHandller(async(req,res,nex)=>{
const {CategoryId,SoftwareName,SubTittle,discription,SoftWareQA,KeyFeatures,UspData} = JSON.parse(req.body.data)
const encodedUspData = UspData.map(item => ({
  ...item,
  content: he.encode(item.content)
}));
const filter = {SoftwareName:SoftwareName}
const update = {$set:{
  CategordId:CategoryId,
  SoftwareName:SoftwareName,
  Image:req.file.filename,
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
const {id} = req.params

  const Data = await softewareAdding.find({CategordId:id}).lean()
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
const CountSoftwares = asyncErrorHandller(async(req,res,next)=>{
const response = await softewareAdding.aggregate([
  {
    $group:{
      _id:'$CategordId',
      count:{$count:{}}
    }
  }
])
res.status(200).json({status:200,message:'success',data:response})
})

const UpdateSoftware = asyncErrorHandller(async (req, res, next) => {
  const {id,CategoryId,SoftwareName,SubTittle,discription,SoftWareQA,KeyFeatures,UspData} = JSON.parse(req.body.data)

 if(!id) throw new CustomError('Id is Missing',404)
  const encodedUspData = UspData.map(item => ({
    ...item,
    content: he.encode(item.content)
  }));
  const update = {$set:{
    CategordId:CategoryId,
    SoftwareName:SoftwareName,
    SubTittle:SubTittle,
    discription:he.encode(discription),
    SoftWareQA:he.encode(SoftWareQA),
    KeyFeatures:KeyFeatures,
    UspData:encodedUspData,
    ...(req.file && { Image: req.file.filename })
  }}
  const Data = await softewareAdding.findByIdAndUpdate(id, update)
  res.status(200).json({ status: 200, message: 'success', documentId: Data?._id, })
})
module.exports = { AddCategory, FetchCategory ,AddSoftware,FetchSofteares,CountSoftwares,UpdateCategory,upload,UpdateSoftware}