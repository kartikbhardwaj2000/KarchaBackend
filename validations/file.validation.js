const { Segments, Joi } = require("celebrate");

module.exports = {
    fileUpload:{
        [Segments.BODY]:{
            filePassword:Joi.string().required(),
        },
    }
}