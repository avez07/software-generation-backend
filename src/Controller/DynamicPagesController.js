const CustomError = require('../utils/customerror')
const multer = require('multer')
const asyncErrorHandller = require('../utils/asyncErrorHandller')
const SoftwareCategory = require('../schema/SoftwareCategory')
const he = require("he");
const fs = require('fs')
const path = require('path')
const softewareAdding = require('../schema/softewareAdding');
const { Upload } = require("@aws-sdk/lib-storage");
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv')
dotenv.config()

const s3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.IAM_API_KEY,
    secretAccessKey: process.env.IAM_API_SECRET
  }
})
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
  const { SlugName, CategoryName, discription, BuyersGuide, Camparision, TableContent, Metatittle, MetaDiscription, MetaKeyWord, position } = req.body
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
      MetaTittle: Metatittle,
      position: position,
      MetaDiscription: MetaDiscription,
      MetaKeyWords: MetaKeyWord.map((items) => items.value),
      TableContent: TableContent.map((items) => items.value),

    }
  };
  const Data = await SoftwareCategory.findOneAndUpdate(filter, update, { upsert: true, returnOriginal: false })
  res.status(200).json({ status: 200, message: 'success', documentId: Data?._id, })
})
const UpdateCategory = asyncErrorHandller(async (req, res, next) => {
  const { id, SlugName, CategoryName, discription, BuyersGuide, Camparision, TableContent, Metatittle, MetaDiscription, MetaKeyWord, position } = req.body
  if (!id) throw new CustomError('Id is Missing', 404)
  const update = {
    $set: {
      slug: SlugName,
      CategoryName: CategoryName,
      Discription: he.encode(discription),
      BuyerGuide: he.encode(BuyersGuide),
      TableCaparison: Camparision,
      MetaTittle: Metatittle,
      MetaDiscription: MetaDiscription,
      position: position,
      MetaKeyWords: MetaKeyWord.map((items) => items.value),
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
  const { CategoryId, SoftwareName, WebsiteLink, PricingData, SubTittle, discription, graphScore, SoftWareQA, KeyFeatures, specData, UspData, Metatittle, MetaDiscription, MetaKeyWord } = JSON.parse(req.body.data)
  // return console.log(req.files)
  const file = req.file
  const fileBuffer = fs.readFileSync(file.path)
  const bucketName = 's3-softwarelogo-v1'
  const key = `logo/${file.filename}`;
  // console.log(file)
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: fileBuffer,
    ContentType: file.mimetype,
  }
  const command = new PutObjectCommand(params)
  const objectresponse = await s3.send(command)
  if (objectresponse.$metadata.httpStatusCode !== 200) throw new CustomError('Something Went Worng', 500)
  // console.log(objectresponse.$metadata.httpStatusCode,req.body.data)
  const s3Url = `https://${bucketName}.s3.ap-south-1.amazonaws.com/${key}`
  console.log(file)
  const fullPath = path.join(file.destination, file.filename);
  await fs.promises.unlink(fullPath); // This works with promises
  const encodedUspData = UspData.map(item => ({
    ...item,
    content: he.encode(item.content)
  }));
  const filter = { SoftwareName: SoftwareName, CategordId: CategoryId }
  const update = {
    $set: {
      CategordId: CategoryId,
      SoftwareName: SoftwareName,
      Image: s3Url,//req.files?.image[0].filename || null,
      SubTittle: SubTittle,
      specData: specData,
      PricingData: PricingData,
      WebsiteLink: WebsiteLink,
      discription: he.encode(discription),
      SoftWareQA: he.encode(SoftWareQA),
      MetaTittle: Metatittle,
      MetaDiscription: MetaDiscription,
      MetaKeyWords: MetaKeyWord.map((items) => items.value),
      KeyFeatures: KeyFeatures.map((items) => items.value),
      graphScore: graphScore,
      UspData: encodedUspData
    }
  }
  const response = await softewareAdding.findOneAndUpdate(filter, update, { upsert: true, returnOriginal: false })
  res.status(200).json({ status: 200, message: 'success', documentId: response?._id })
})
const FetchSofteares = asyncErrorHandller(async (req, res, next) => {
  const { id } = req.params

  const Data = await softewareAdding.find({ CategordId: id, Active: true }).sort({ position: 1 }).lean()
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
  const { id, CategoryId, SoftwareName, PricingData, SubTittle, discription, graphScore, WebsiteLink, SoftWareQA, KeyFeatures, specData, UspData, Metatittle, MetaDiscription, MetaKeyWord } = JSON.parse(req.body.data)
  // console.log(Metatittle)

  if (!id) throw new CustomError('Id is Missing', 404)
  const LastObj = await softewareAdding.findById(id).select('Image').lean()
  let s3Url = ''
  if (req.file) {
    // console.log(LastObj)
    const file = req.file
    const fileBuffer = fs.readFileSync(file.path)
    const imageParts = LastObj.Image.split('/'); // Split the URL by '/'
    const deleteObj = imageParts[imageParts.length - 1];
    // return console.log(deleteObj)
    const bucketName = 's3-softwarelogo-v1'
    const key = `logo/${deleteObj}`;
    const params = {
      Bucket: bucketName,
      Key: key,
    }
    const command = new DeleteObjectCommand(params)
    const objectresponse = await s3.send(command)

    const params2 = {
      Bucket: bucketName,
      Key: key,
      Body: fileBuffer,
      ContentType: file.mimetype,
    }
    const command2 = new PutObjectCommand(params2)
    const objectresponse2 = await s3.send(command2)
    s3Url = `https://${bucketName}.s3.ap-south-1.amazonaws.com/${key}`
    const fullPath = file.destination + file.filename
    await fs.promises.unlink(fullPath)

  }
  const encodedUspData = UspData.map(item => ({
    ...item,
    content: he.encode(item.content)
  }));
  const update = {
    $set: {
      CategordId: CategoryId,
      SoftwareName: SoftwareName,
      SubTittle: SubTittle,
      specData: specData,
      WebsiteLink: WebsiteLink,
      graphScore: graphScore,
      discription: he.encode(discription),
      SoftWareQA: he.encode(SoftWareQA),
      KeyFeatures: KeyFeatures.map((items) => items.value),
      UspData: encodedUspData,
      MetaTittle: Metatittle,
      MetaDiscription: MetaDiscription,
      MetaKeyWords: MetaKeyWord.map((items) => items.value),
      PricingData: PricingData,
      // ...(req.files?.specification && { specification: req.files.specification[0].filename }),
      ...(req.file && { Image: s3Url })

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
  const Response = await SoftwareCategory.find({ Active: true }).select("slug Active CategoryName position -_id").lean()
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
  const Software = await softewareAdding.find({ CategordId: CategoryId._id }).select('SoftwareName Image discription').sort({ position: 1 }).lean()
  if (Software.length == 0) throw new CustomError('Software Not found', 404)
  const MappingData = await Software.map((item) => {
    item.discription = he.decode(item.discription);
    return { ...item };
  });
  res.status(200).json({ status: 200, message: 'success', data: MappingData })


})
const FetchsoftwareDetails = asyncErrorHandller(async (req, res, next) => {
  const { id } = req.params
  const software = await softewareAdding.findById(id).lean()
  if (!software) throw new CustomError('Category Not found', 404)
  const MappingData = await [software].map((item) => {
    item.discription = he.decode(item.discription);
    return { ...item };

  })
  res.status(200).json({ status: 200, message: 'success', data: MappingData[0] })

})
const FetchAllSoftwareNew = asyncErrorHandller(async (req, res, next) => {
  const AllSoftware = await softewareAdding.find({}).select('CategordId SoftwareName  _id').populate({ path: 'CategordId', select: 'slug CategoryName' }).lean()
  res.status(200).json({ status: 200, message: 'success', data: AllSoftware })
})
const UpdateAllSoftwareNew = asyncErrorHandller(async (req, res, next) => {
  const AllSoftware = await softewareAdding.find({}).select('CategordId _id').lean()
  // const Id = []
  const allSoftware = await softewareAdding.find({}).select('CategordId _id').lean();
  const ids = await Promise.all(allSoftware.map(async (element) => {
    const category = await SoftwareCategory.findById(element.CategordId).lean();
    await softewareAdding.findByIdAndUpdate(element._id, { CategordId: element.CategordId });
    return category ? element : null;
  }));

  res.status(200).json({ status: 200, message: 'success', data: ids })
})
const DemoFunction = async (req, res, next) => {
  try {
    const softwares = await softewareAdding.find({}).sort({ categoryId: 1, position: 1 }).lean();

    let currentCategory = null;
    let positionCounter = 1;

    for (let i = 0; i < softwares.length; i++) {
      if (!currentCategory || !softwares[i].categoryId.equals(currentCategory)) {
        currentCategory = softwares[i].categoryId; // Switch to a new category
        positionCounter = 1; // Reset the position counter for the new category
      }

      // Update the position if it's not correct
      if (softwares[i].position !== positionCounter) {
        await softewareAdding.findByIdAndUpdate(softwares[i]._id, { position: positionCounter });
      }

      positionCounter++;
    }

    res.status(200).json({ message: 'Positions updated successfully.' });
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};
const SoftwarePostionSet = asyncErrorHandller(async (req, res, next) => {

  const { softwarePosition, categoryId } = req.body;

  if (!softwarePosition || !Array.isArray(softwarePosition) || softwarePosition.length === 0) throw new CustomError('Invalid softwarePosition array.', 400)
  if (!categoryId) throw new CustomError('categoryId is required.', 400)
  for (const { softwareId, position } of softwarePosition) {
    if (!softwareId || !position) continue;
    await softewareAdding.findOneAndUpdate(
      { _id: softwareId, CategordId: categoryId },
      { position: position },
    );
  }

  res.status(200).json({ message: 'Positions updated successfully.' });

})
const healthCheck = asyncErrorHandller(async (req, res, next) => {
  const name = process.env.Name || 'Avez'
  res.status(200).json({ Name: `Hi My Name Is ${name} 3` })
})

module.exports = {
  healthCheck,
  AddCategory, FetchCategory, AddSoftware, FetchSofteares, CountSoftwares, UpdateCategory, upload,
  UpdateSoftware, UpdateCategoryStatus, DeleteSoftware, FetchAllCategory, FetchCategoryDetails, FetchAllSoftware,
  FetchsoftwareDetails, DemoFunction, SoftwarePostionSet, FetchAllSoftwareNew, UpdateAllSoftwareNew
}