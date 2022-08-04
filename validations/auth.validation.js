const { Segments, Joi } = require("celebrate");

module.exports ={
    register : {
    [Segments.BODY]:{
        email:Joi.string().email().required(),
        password:Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/),
        name:Joi.string().required().max(20),
    }
    },
    login:{
        [Segments.BODY]:{
            email:Joi.string().email().required(),
            password:Joi.string().required(),
        }
    }
}