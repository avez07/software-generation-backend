const Campare = require('../schema/camparissionForm')
const freeDemo = require('../schema/freeDemo')
const GetPricing = require('../schema/pricing')
const SofwareListed = require('../schema/softwareListed')
const trendSoftrware = require('../schema/trendinSoftDemo')
const UserAuth = require('../schema/userAuth')
const asyncErrorHandller = require('../utils/asyncErrorHandller')
const UtctoLocalString = require('../utils/common')
const CustomError = require('../utils/customerror')

const UserRegistration = asyncErrorHandller(async(req,res,next)=>{
    const {fullName,phoneNo,email,companyName,softwareRequired,employeeStrength,challenges,flag} = req.body
   const UseerAuth = new UserAuth({
    fullName:fullName,
    phoneNo:phoneNo,
    email:email,
    companyName:companyName,
    softwareRequired:softwareRequired,
    employeeStrength:employeeStrength,
    challenges:challenges,
    flag:flag
   })
   await UseerAuth.save();
   res.status(200).json({status:200,message:'success'});
})
const softwareListed = asyncErrorHandller(async(req,res,next)=>{
    const {fullName,phoneNo,email,websiteLink,companyName} = req.body
    const software = new SofwareListed({
     fullName:fullName,
     phoneNo:phoneNo,
     email:email,
     companyName:companyName,
     websiteLink:websiteLink
    })
    await software.save();
    res.status(200).json({status:200,message:'success'});
})

const trendingSoftdemo = asyncErrorHandller(async(req,res,next)=>{
    const {fullName,phoneNo,email,softwareCategory,softwareName,employeeStrength,preferedDemoDate} = req.body
   const trendDemo = new trendSoftrware({
    fullName:fullName,
    phoneNo:phoneNo,
    email:email,
    softwareCategory:softwareCategory,
    softwareName :softwareName,
    employeeStrength:employeeStrength,
    preferedDemoDate: preferedDemoDate,
   })
   await trendDemo.save();
   res.status(200).json({status:200,message:'success'});
})
const freeDemosoft = asyncErrorHandller(async(req,res,next)=>{
    const {fullName,phoneNo,email,softwareCategory,softwareName,employeeStrength,preferedDemoDate} = req.body
   const freeDemoInc = new freeDemo({
    fullName:fullName,
    phoneNo:phoneNo,
    email:email,
    softwareCategory:softwareCategory,
    softwareName :softwareName,
    employeeStrength:employeeStrength,
    preferedDemoDate: preferedDemoDate,
   })
   await freeDemoInc.save();
   res.status(200).json({status:200,message:'success'});
})
const getPricing = asyncErrorHandller(async(req,res,next)=>{
    const {fullName,phoneNo,email,softwareCategory,softwareName,employeeStrength} = req.body
   const getPricingsoft = new GetPricing({
    fullName:fullName,
    phoneNo:phoneNo,
    email:email,
    softwareCategory:softwareCategory,
    softwareName :softwareName,
    employeeStrength:employeeStrength,
   })
   await getPricingsoft.save();
   res.status(200).json({status:200,message:'success'});
})
const campareForm = asyncErrorHandller(async(req,res,next)=>{
    const {fullName,phoneNo,email,softwareCategory,softwareName,employeeStrength} = req.body
   const CampareData = new Campare({
    fullName:fullName,
    phoneNo:phoneNo,
    email:email,
    softwareCategory:softwareCategory,
    softwareName :softwareName,
    employeeStrength:employeeStrength,
   })
   await CampareData.save();
   res.status(200).json({status:200,message:'success'});
})
module.exports = {UserRegistration,softwareListed,trendingSoftdemo,freeDemosoft,getPricing,campareForm}