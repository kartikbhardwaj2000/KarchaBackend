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