const Campare = require('../schema/camparissionForm')
const softCategory = require('../schema/category')
const contact = require('../schema/contact')
const freeDemo = require('../schema/freeDemo')
const GetPricing = require('../schema/pricing')
const UserReview = require('../schema/review')
const SofwareListed = require('../schema/softwareListed')
const trendSoftrware = require('../schema/trendinSoftDemo')
const UserAuth = require('../schema/userAuth')
const uspAndFetuers = require('../schema/usps&features')
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
    const {fullName,phoneNo,email,websiteLink,companyName,employeeStrength} = req.body
    const software = new SofwareListed({
     fullName:fullName,
     phoneNo:phoneNo,
     email:email,
     companyName:companyName,
     websiteLink:websiteLink,
     employeeStrength:employeeStrength
    })
    await software.save();
    res.status(200).json({status:200,message:'success'});
})

const trendingSoftdemo = asyncErrorHandller(async(req,res,next)=>{
    const {fullName,phoneNo,email,softwareCategory,softwareName,employeeStrength} = req.body
   const trendDemo = new trendSoftrware({
    fullName:fullName,
    phoneNo:phoneNo,
    email:email,
    softwareCategory:softwareCategory,
    softwareName :softwareName,
    employeeStrength:employeeStrength,
    // preferedDemoDate: preferedDemoDate,
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
    const {fullName,phoneNo,email,softwareCategory,softwareName,employeeStrength,companyName,challenges} = req.body
   const CampareData = new Campare({
    fullName:fullName,
    phoneNo:phoneNo,
    email:email,
    softwareCategory:softwareCategory,
    softwareName :softwareName,
    employeeStrength:employeeStrength,
    campanyName:companyName,
    challenges:challenges,
   })
   await CampareData.save();
   res.status(200).json({status:200,message:'success'});
})

const softwareCategory = asyncErrorHandller(async(req,res,next)=>{
    const {fullName,phoneNo,email,softwareCategory,employeeStrength} = req.body
   const softCategories = new softCategory({
    fullName:fullName,
    phoneNo:phoneNo,
    email:email,
    softwareCategory:softwareCategory,
    employeeStrength:employeeStrength,
 
   })
   await softCategories.save();
   res.status(200).json({status:200,message:'success'});
})
const uspAndfetures = asyncErrorHandller(async(req,res,next)=>{
    const {fullName,phoneNo,email,softwareCategory,softwareName,employeeStrength} = req.body
   const response = new uspAndFetuers({
    fullName:fullName,
    phoneNo:phoneNo,
    email:email,
    softwareCategory:softwareCategory,
    softwareName:softwareName,
    employeeStrength:employeeStrength,
 
   })
   await response.save();
   res.status(200).json({status:200,message:'success'});
})
const review = asyncErrorHandller(async(req,res,next)=>{
    const {fullName,email,message,JobTittle,SoftwareUsage,SoftwareName,UIUX,FeatuersFunc,Performance,Customization,ValueForMoney,CustomerSupport,Integration,ReportingAnalytics} = req.body
    const response = new UserReview({
        fullName: fullName,
        email: email,
        JobTittle: JobTittle,
        SoftwareUsage: SoftwareUsage,
        SoftwareName: SoftwareName,
        UIUX: UIUX,
        message : message,
        FeatuersFunc: FeatuersFunc,
        Performance: Performance,
        ValueForMoney: ValueForMoney,
        Customization:Customization,
        CustomerSupport: CustomerSupport,
        Integration: Integration,
        ReportingAnalytics:ReportingAnalytics
    })
       await response.save();
       res.status(200).json({status:200,message:'success'});
})
const AddContact = asyncErrorHandller(async(req,res,next)=>{
    const requiredFields  = ['fullName','phoneNo','email','Message']
    for (const field of requiredFields) {
        if (!req.body[field] || req.body[field].toString().trim() === '') {
          throw new CustomError(`${field} is required and cannot be empty`,400)         
        }
      }
      const {fullName,phoneNo,email,Message} = req.body
      
    const response = new contact({
        fullName:fullName,
        phoneNo:phoneNo,
        email:email,
        Message:Message, 
    })
    
    await response.save()
    console.log(response)
    res.status(200).json({status:200,message:'success'});
})
module.exports = {UserRegistration,softwareListed,trendingSoftdemo,freeDemosoft,getPricing,campareForm,softwareCategory,uspAndfetures,review,AddContact}