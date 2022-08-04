const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../constants');
const _ = require('lodash');
const ApiError = require('../utils/apiError');

module.exports = (authRoles) => async (req, res, next) => {
  try {
    const authorizationHeader = _.get(req,['headers','authorization']) 
    if(!authorizationHeader){
        throw new ApiError({status:403, message:'unauthenticated'});
    }
    const token = authorizationHeader.split(' ')[1];
    const decodedData = await jwt.verify(token, JWT_SECRET);
    if (!authRoles.includes(decodedData.role)) {
      throw new ApiError({ status: 401, message: 'unauthorised' });
    }
    req.user = decodedData;
    next();
  } catch (error) {
    if( error instanceof jwt.TokenExpiredError)
    {
      next(new ApiError({ status: 403, message: 'token expired' }));

    }
    if (error instanceof jwt.JsonWebTokenError) {
      next(new ApiError({ status: 403, message: 'unauthenticated' }));
    }
    next(error);
  }
};
