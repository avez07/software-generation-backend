const express = require('express');
const errorConroller = require('../Controller/errorConroller');
const RegisterController = require('../Controller/RegisterController');
const RetiveController = require('../Controller/RetriveController');
const DynamicController = require('../Controller/DynamicPagesController')
const {upload} = require('../Controller/DynamicPagesController')


const router = express.Router()
router.route('/healthCheck').get(DynamicController.healthCheck)
router.route('/UserRegister').post(RegisterController.UserRegistration)
router.route('/softwareListed').post(RegisterController.softwareListed)
router.route('/trendingDemo').post(RegisterController.trendingSoftdemo)
router.route('/freeDemo').post(RegisterController.freeDemosoft)
router.route('/softpricing').post(RegisterController.getPricing)
router.route('/campare').post(RegisterController.campareForm)
router.route('/softCategory').post(RegisterController.softwareCategory)
router.route('/uspsFetures').post(RegisterController.uspAndfetures)
router.route('/review').post(RegisterController.review)
router.route('/AddContact').post(RegisterController.AddContact)



router.route('/getUser/:flag').get(RetiveController.userAuth)
router.route('/trendingsoft').get(RetiveController.trendingSoftrware)
router.route('/campareSoft').get(RetiveController.campareSoft)
router.route('/freeDemo').get(RetiveController.freeDemoCate)
router.route('/softlist').get(RetiveController.softwareListed)
router.route('/uspsFetures').get(RetiveController.uspAndFetuer)
router.route('/softpricing').get(RetiveController.getpricing)
router.route('/categorySoft').get(RetiveController.CategorySotware)
router.route('/review').get(RetiveController.review)
router.route('/contact').get(RetiveController.Contact)



//dynamic routing 
router.route('/AddCategory').post(DynamicController.AddCategory)
router.route('/UpdateCategory').post(DynamicController.UpdateCategory)
router.route('/updateCategoryStatus').get(DynamicController.UpdateCategoryStatus)
router.route('/FetchAllCategory').get(DynamicController.FetchCategory)
router.route('/AddSoftware').post(upload.single('image'),DynamicController.AddSoftware)
router.route('/UpdateSoftware').post(upload.single('image'),DynamicController.UpdateSoftware)
router.route('/FetchAllSoftware/:id').get(DynamicController.FetchSofteares)
router.route('/updateSoftwareStatus').get(DynamicController.DeleteSoftware)
router.route('/CountSoftware').get(DynamicController.CountSoftwares)
router.route('/FetchAllCategoryName').get(DynamicController.FetchAllCategory)
router.route('/FetchCategorydetails/:slug').get(DynamicController.FetchCategoryDetails)
router.route('/FetchAllSoftwareName/:slug').get(DynamicController.FetchAllSoftware)
router.route('/FetchSoftewaredetails/:id').get(DynamicController.FetchsoftwareDetails)
router.route('/demo1').get(DynamicController.DemoFunction)
router.route('/softranked').post(DynamicController.SoftwarePostionSet)
router.route('/AllSoft').get(DynamicController.FetchAllSoftwareNew)

//addvertising

router.route('/AddAdvertising').post(upload.single('image'),DynamicController.AddAdvertiesing)
router.route('/UpdateAdvertise').post(upload.single('image'),DynamicController.UpdateAdvertiesing)
router.route('/GetAdvertiesByCategory/:id').get(DynamicController.GetAdvertiesByCategory)
router.route('/toggleAdvertiseActive/:id').patch(DynamicController.ToggleAdvertiesActive)




router.route('/AllCategory').get(DynamicController.AllCategory)
router.route('/AllAdvertisment').get(DynamicController.AllAdvertisvment)

router.use(errorConroller)

router.route('/*').all(async(req,res,next)=>{
    res.status(405).json({status:405,message:'Method Not Allowed'})
})








module.exports = router