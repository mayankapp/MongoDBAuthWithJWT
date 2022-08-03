const Joi = require('joi');

const createUserSchema = async(req, res, next) => { 
    const schema = Joi.object({
        name: Joi.string().required().min(4).max(15),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        confirm_password: Joi.ref('password'),
        token: Joi.string().alphanum().min(3).max(200).optional()
    }); 
    const value = await schema.validate(req.body);
    if (value.error) {
        res.status(400).json({
            status: 400,
            message: value.error.details[0].message
        })
    } else {
        next();
    }
    
}

// helper functions

// function validateRequest(req, next, schema) {
//     const options = {
//         abortEarly: false, // include all errors
//         allowUnknown: true, // ignore unknown props
//         stripUnknown: true // remove unknown props
//     };
//     const { error, value } = schema.validate(req.body, options);
//     if (error) {
//         next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
//     } else {
//         req.body = value;
//         next();
//     }
// }

module.exports = createUserSchema