const Joi = require('joi');
const jwt = require('jsonwebtoken');

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

// Verify the Token
const verifyToken = async (req, res, next) => {
    try {
        const token = req.body.token || req.headers["x-access-token"];
        if (!token) {
            res.status(400).json({ error: "A token must be provided for Authentication" });
        }
        jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    createUserSchema,
    verifyToken
}