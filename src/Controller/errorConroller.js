const UtctoLocalString = require('../utils/common.js')
const CustomError = require('../utils/customerror.js')
const fs = require('fs')
const errorLog = (req,res,err)=>{
    return `
    Remote ADD: ${UtctoLocalString(new Date(Date.now()),'dddd, MMMM Do YYYY, h:mm:ss a')}
    URL : ${req.protocol}://${req.get('host')}${req.originalUrl}
    RequestBody : ${JSON.stringify(req.body)}
    Authorization : ${req.headers['authorization']|| 'undefine'}
    Response : ${err.stack}
    `
}
const JsonWebTokenCustomError =(err)=>{
    return new CustomError(err.message,404)
}
const DataValidation = (err)=>{
// const errorObject = err
// console.log(errorObject.details);
    const errorObject =  err.details.reduce((acc,details)=>{
        const path = details.path.join('.')
        const message = details.message;
        return{...acc, [path]:message}
    },{})
   return new CustomError(JSON.stringify(errorObject),404)
}
const ValidationErrorHandler = (err)=>{
    const errorNames = [];
    for (const key in err.errors) {
        if (err.errors.hasOwnProperty(key)) {
          errorNames.push(err.errors[key].message);
        }
      }
      return new CustomError(errorNames, 403);
}
const CastErrorhandler = (err) => {    
    const meg = `Invalid Value ${err.value} for feild ${err.path}`;
    return new CustomError(meg, 500);
}
const deverror = (res, err) => {
   
    res.status(err.statuscode).json({
        status: err.statuscode,
        message: err.message,
        stacktrace: err.stack,
        error: err
    })
}
const proderror = (req,res, err) => {
    if (err.isOperational) {
        res.status(err.statuscode).json({
            status: err.statuscode,
            message: err.message,
        })
    } else {
        fs.appendFileSync(`../log-data/error-${UtctoLocalString(new Date(Date.now()),'YY-MM-DD')}.log`, errorLog(req,res,err));
        res.status(500).json({
            status: 500,
            message: 'Something Went Wrong Try Again !',
        })
    }
}


module.exports = (error, req, res, next) => {
    error.statuscode = error.statuscode || 500;
    error.status = error.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        deverror(res, error)
    } else if (process.env.NODE_ENV === 'production') {
        // return console.error(error.name)
        if (error.name === 'CastError') error = CastErrorhandler(error)
        if (error.name === 'ValidationError') error = ValidationErrorHandler(error)        
        if (error.name === 'dataValidation') error = DataValidation(error)
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') error = JsonWebTokenCustomError(error)

        proderror(req,res, error)
    }
}