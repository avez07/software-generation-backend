const express = require('express');
const errorConroller = require('../Controller/errorConroller');
const RegisterController = require('../Controller/RegisterController');
const RetiveController = require('../Controller/RetriveController');
const DynamicController = require('../Controller/DynamicPagesController')

const router = express.Router()

router.route('/UserRegister').post(RegisterController.UserRegistration)
router.route('/softwareListed').post(RegisterController.softwareListed)
router.route('/trendingDemo').post(RegisterController.trendingSoftdemo)
router.route('/freeDemo').post(RegisterController.freeDemosoft)
router.route('/softpricing').post(RegisterController.getPricing)
router.route('/campare').post(RegisterController.campareForm)
router.route('/softCategory').post(RegisterController.softwareCategory)
router.route('/uspsFetures').post(RegisterController.uspAndfetures)
router.route('/review').post(RegisterController.review)


router.route('/getUser/:flag').get(RetiveController.userAuth)
router.route('/trendingsoft').get(RetiveController.trendingSoftrware)
router.route('/campareSoft').get(RetiveController.campareSoft)
router.route('/freeDemo').get(RetiveController.freeDemoCate)
router.route('/softlist').get(RetiveController.softwareListed)
router.route('/uspsFetures').get(RetiveController.uspAndFetuer)
router.route('/softpricing').get(RetiveController.getpricing)
router.route('/categorySoft').get(RetiveController.CategorySotware)
router.route('/review').get(RetiveController.review)

//dynamic routing 
router.route('/AddCategory').post(DynamicController.AddCategory)
router.route('/FetchAllCategory').get(DynamicController.FetchCategory)








router.route('/*').all(async(req,res,next)=>{
    res.status(405).json({status:405,message:'Method Not Allowed'})
})








router.use(errorConroller)
module.exports = router