const { Segments, Joi } = require("celebrate");

module.exports ={
    jobStatus:{
        [Segments.PARAMS]:{
            id:Joi.string().length(24)
        }
    }
}