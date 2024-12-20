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
  const { SlugName, CategoryName, discription, BuyersGuide, Camparision, TableContent } = req.body
  const filter = {
    slug: new RegExp(`^${SlugName}$`, "i"), // Case-insensitive for field1
    CategoryName: new RegExp(`^${CategoryName}$`, "i"), // Case-insensitive for field2
  };

  const update = {
    $set: {
      slug: SlugName,
      CategoryName: CategoryName,
      Discription: he.encode(discription),
      BuyerGuide: he.encode(BuyersGuide),
      TableCaparison: Camparision,
      TableContent: TableContent.map((items) => items.value),

    }
  };
  const Data = await SoftwareCategory.findOneAndUpdate(filter, update, { upsert: true, returnOriginal: false })
  res.status(200).json({ status: 200, message: 'success', documentId: Data?._id, })
})
const UpdateCategory = asyncErrorHandller(async (req, res, next) => {
  const { id, SlugName, CategoryName, discription, BuyersGuide, Camparision, TableContent } = req.body
  if (!id) throw new CustomError('Id is Missing', 404)
  const update = {
    $set: {
      slug: SlugName,
      CategoryName: CategoryName,
      Discription: he.encode(discription),
      BuyerGuide: he.encode(BuyersGuide),
      TableCaparison: Camparision,
      TableContent: TableContent.map((items) => items.value),
    }
  };
  const Data = await SoftwareCategory.findByIdAndUpdate(id, update)
  res.status(200).json({ status: 200, message: 'success', documentId: Data?._id, })
})
const FetchCategory = asyncErrorHandller(async (req, res, next) => {

  const Data = await SoftwareCategory.find({}).populate('TableCaparison', 'SoftwareName').lean()
  const MappingData = Data.map((item) => {

    item.BuyerGuide = he.decode(item.BuyerGuide);
    item.Discription = he.decode(item.Discription);
    return { ...item };
  });
  res.status(200).json({ status: 200, message: 'success', data: MappingData, })
})

const UpdateCategoryStatus = asyncErrorHandller(async (req, res, next) => {
  const { id } = req.query
  if (!id) throw CustomError('Id is INvalid', 404)
  const Update = await SoftwareCategory.findByIdAndUpdate(id, [{ $set: { Active: { $not: '$Active' } } }], { new: true })
  res.status(200).json({ status: 200, message: 'success', data: Update })

})

const AddSoftware = asyncErrorHandller(async (req, res, nex) => {
  const { CategoryId, SoftwareName, SubTittle, discription, graphScore, SoftWareQA, KeyFeatures, TableContent, UspData } = JSON.parse(req.body.data)
  // return console.log(req.files)
  const encodedUspData = UspData.map(item => ({
    ...item,
    content: he.encode(item.content)
  }));
  const filter = { SoftwareName: SoftwareName }
  const update = {
    $set: {
      CategordId: CategoryId,
      SoftwareName: SoftwareName,
      Image: req.files?.image[0].filename || null,
      SubTittle: SubTittle,
      discription: he.encode(discription),
      SoftWareQA: he.encode(SoftWareQA),
      specification: req.files?.specification[0].filename || null,
      KeyFeatures: KeyFeatures.map((items) => items.value),
      graphScore: graphScore,
      UspData: encodedUspData
    }
  }
  const response = await softewareAdding.findOneAndUpdate(filter, update, { upsert: true, returnOriginal: false })
  res.status(200).json({ status: 200, message: 'success', documentId: response?._id, })
})
const FetchSofteares = asyncErrorHandller(async (req, res, next) => {
  const { id } = req.params

  const Data = await softewareAdding.find({ CategordId: id, Active: true }).lean()
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
const CountSoftwares = asyncErrorHandller(async (req, res, next) => {
  const response = await softewareAdding.aggregate([
    {
      $match: { Active: true }
    },
    {
      $group: {
        _id: '$CategordId',
        count: { $count: {} }
      }
    }
  ])
  res.status(200).json({ status: 200, message: 'success', data: response })
})

const UpdateSoftware = asyncErrorHandller(async (req, res, next) => {
  const { id, CategoryId, SoftwareName, SubTittle, discription, SoftWareQA, KeyFeatures, TableContent, UspData } = JSON.parse(req.body.data)

  if (!id) throw new CustomError('Id is Missing', 404)
  const encodedUspData = UspData.map(item => ({
    ...item,
    content: he.encode(item.content)
  }));
  const update = {
    $set: {
      CategordId: CategoryId,
      SoftwareName: SoftwareName,
      SubTittle: SubTittle,
      discription: he.encode(discription),
      SoftWareQA: he.encode(SoftWareQA),
      KeyFeatures: KeyFeatures.map((items) => items.value),
      UspData: encodedUspData,
      ...(req.files?.specification && { specification: req.files.specification[0].filename }),
      ...(req.files?.image && { Image: req.files.image[0].filename })

    }
  }
  const Data = await softewareAdding.findByIdAndUpdate(id, update)
  res.status(200).json({ status: 200, message: 'success', documentId: Data?._id, })
})
const DeleteSoftware = asyncErrorHandller(async (req, res, next) => {
  const { id } = req.query
  if (!id) throw CustomError('Id is Invalid', 404)
  const Update = await softewareAdding.findByIdAndUpdate(id, [{ $set: { Active: { $not: '$Active' } } }], { new: true })
  res.status(200).json({ status: 200, message: 'success', data: Update })
})

const FetchAllCategory = asyncErrorHandller(async (req, res, next) => {
  const Response = await SoftwareCategory.find({}).select("slug CategoryName -_id").lean()
  res.status(200).json({ status: 200, message: 'success', data: Response })
})
const FetchCategoryDetails = asyncErrorHandller(async (req, res, next) => {
  const { slug } = req.params
  const Response = await SoftwareCategory.findOne({ slug: slug }).lean()
  if (!Response) throw new CustomError('Category Not found', 404)
  const MappingData = [Response].map((item) => {

    item.BuyerGuide = he.decode(item.BuyerGuide);
    item.Discription = he.decode(item.Discription);
    return { ...item };
  });
  res.status(200).json({ status: 200, message: 'success', data: MappingData[0] })
})
const FetchAllSoftware = asyncErrorHandller(async (req, res, next) => {
  const { slug } = req.params
  const CategoryId = await SoftwareCategory.findOne({ slug: slug }).select('_id').lean()
  if (!CategoryId) throw new CustomError('Category Not found', 404)
    const Software = await softewareAdding.find({ CategordId: CategoryId._id }).select('SoftwareName Image discription').lean()
  if(Software.length == 0) throw new CustomError('Software Not found', 404)
    const MappingData = await Software.map((item) => {
  item.discription = he.decode(item.discription);
  return { ...item };
});
  res.status(200).json({ status: 200, message: 'success', data: MappingData })


})
const FetchsoftwareDetails = asyncErrorHandller(async(req,res,next)=>{
  const { id } = req.params
  const software = await softewareAdding.findById(id).lean()
  if (!software) throw new CustomError('Category Not found', 404)
    const MappingData = await [software].map((item) => {
      item.discription = he.decode(item.discription);
      return { ...item };

})
res.status(200).json({ status: 200, message: 'success', data: MappingData[0] })

})

module.exports = {
  AddCategory, FetchCategory, AddSoftware, FetchSofteares, CountSoftwares, UpdateCategory, upload,
  UpdateSoftware, UpdateCategoryStatus, DeleteSoftware, FetchAllCategory, FetchCategoryDetails,FetchAllSoftware,
  FetchsoftwareDetails
}