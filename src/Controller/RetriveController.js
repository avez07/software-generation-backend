const Campare = require('../schema/camparissionForm')
const softCategory = require('../schema/category')
const freeDemo = require('../schema/freeDemo')
const GetPricing = require('../schema/pricing')
const SofwareListed = require('../schema/softwareListed')
const trendSoftrware = require('../schema/trendinSoftDemo')
const UserAuth = require('../schema/userAuth')
const uspAndFetuers = require('../schema/usps&features')
const asyncErrorHandller = require('../utils/asyncErrorHandller')
const UtctoLocalString = require('../utils/common')
const CustomError = require('../utils/customerror')

const userAuth = asyncErrorHandller(async (req, res, next) => {
    const { flag } = req.params
    if (flag !== 'UserAuth' && flag !== 'CallBack') throw new CustomError('flag is not valid')
    const response = await UserAuth.find({ flag: flag }).select('-_id -flag -__v').lean()
    response.map((items) => {
        items.createdAt = UtctoLocalString(items.createdAt, 'YYYY-MM-DD HH:mm:ss')
        items.updatedAt = UtctoLocalString(items.updatedAt, 'YYYY-MM-DD HH:mm:ss')

        return items
    })
    res.status(200).json({ message: 'success', status: 200, data: response })
})
const trendingSoftrware = asyncErrorHandller(async (req, res, next) => {
    const response = await trendSoftrware.find({}).select('-_id -__v').lean()
    response.map((items) => {
        items.createdAt = UtctoLocalString(items.createdAt, 'YYYY-MM-DD HH:mm:ss')
        items.updatedAt = UtctoLocalString(items.updatedAt, 'YYYY-MM-DD HH:mm:ss')

        return items
    })
    res.status(200).json({ message: 'success', status: 200, data: response })
})
const campareSoft = asyncErrorHandller(async (req, res, next) => {
    const response = await Campare.find({}).select('-_id -__v').lean()
    response.map((items) => {
        items.createdAt = UtctoLocalString(items.createdAt, 'YYYY-MM-DD HH:mm:ss')
        items.updatedAt = UtctoLocalString(items.updatedAt, 'YYYY-MM-DD HH:mm:ss')

        return items
    })
    res.status(200).json({ message: 'success', status: 200, data: response })
})
const freeDemoCate = asyncErrorHandller(async (req, res, next) => {
    const response = await freeDemo.find({}).select('-_id -__v').lean()
    response.map((items) => {
        items.createdAt = UtctoLocalString(items.createdAt, 'YYYY-MM-DD HH:mm:ss')
        items.updatedAt = UtctoLocalString(items.updatedAt, 'YYYY-MM-DD HH:mm:ss')

        return items
    })
    res.status(200).json({ message: 'success', status: 200, data: response })
})
const CategorySotware = asyncErrorHandller(async (req, res, next) => {
    const response = await softCategory.find({}).select('-_id -__v').lean()
    response.map((items) => {
        items.createdAt = UtctoLocalString(items.createdAt, 'YYYY-MM-DD HH:mm:ss')
        items.updatedAt = UtctoLocalString(items.updatedAt, 'YYYY-MM-DD HH:mm:ss')

        return items
    })
    res.status(200).json({ message: 'success', status: 200, data: response })
})
const softwareListed = asyncErrorHandller(async (req, res, next) => {
    const response = await SofwareListed.find({}).select('-_id -__v').lean()
    response.map((items) => {
        items.createdAt = UtctoLocalString(items.createdAt, 'YYYY-MM-DD HH:mm:ss')
        items.updatedAt = UtctoLocalString(items.updatedAt, 'YYYY-MM-DD HH:mm:ss')

        return items
    })
    res.status(200).json({ message: 'success', status: 200, data: response })
})
const uspAndFetuer = asyncErrorHandller(async (req, res, next) => {
    const response = await uspAndFetuers.find({}).select('-_id -__v').lean()
    response.map((items) => {
        items.createdAt = UtctoLocalString(items.createdAt, 'YYYY-MM-DD HH:mm:ss')
        items.updatedAt = UtctoLocalString(items.updatedAt, 'YYYY-MM-DD HH:mm:ss')

        return items
    })
    res.status(200).json({ message: 'success', status: 200, data: response })
})
const getpricing = asyncErrorHandller(async (req, res, next) => {
    const response = await GetPricing.find({}).select('-_id -__v').lean()
    response.map((items) => {
        items.createdAt = UtctoLocalString(items.createdAt, 'YYYY-MM-DD HH:mm:ss')
        items.updatedAt = UtctoLocalString(items.updatedAt, 'YYYY-MM-DD HH:mm:ss')

        return items
    })
    res.status(200).json({ message: 'success', status: 200, data: response })
})


module.exports = { userAuth, trendingSoftrware, campareSoft, freeDemoCate, CategorySotware,softwareListed ,uspAndFetuer,getpricing}