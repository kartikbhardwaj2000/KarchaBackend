const { CelebrateError } = require("celebrate");
const { MulterError } = require("multer");
const ApiError = require("../utils/apiError")

exports.errorhandler = (error,req,res,next) => {
    if(error instanceof ApiError)
    {
        return res.status(error.status).json({
            status:error.status,
            message:error.message
        })
    }
    res.status(500).json({
        status:500,
        message:error.message||'internal server error',
    });
}
exports.multerErrorHandler = (error,req,res,next) => {
    if(error instanceof MulterError)
    {
        return next(new ApiError({status:400,message:error.message}));
    }
    next(error);
}
exports.validationErrorHandler = (error,req,res,next) => {
    if(error instanceof CelebrateError)
    {
        console.log(error);
        return next(new ApiError({status:400, message:error.message}));
    }
    next(error);
}
exports.notFoundHandler = (req,res) =>{
    res.status(404).json({
        status:404,
        message:'not found'
    })
}