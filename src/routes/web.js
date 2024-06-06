const express = require('express');
const errorConroller = require('../Controller/errorConroller');
const RegisterController = require('../Controller/RegisterController');
const router = express.Router()

router.route('/UserRegister').post(RegisterController.UserRegistration)
router.route('/softwareListed').post(RegisterController.softwareListed)
router.route('/trendingDemo').post(RegisterController.trendingSoftdemo)
router.route('/freeDemo').post(RegisterController.freeDemosoft)
router.route('/softpricing').post(RegisterController.getPricing)
router.route('/campare').post(RegisterController.campareForm)








router.use(errorConroller)
module.exports = router