const joi = require("joi");
let AppError = require("../utils/AppError")
let registerValidator = (req, res, next) => {
    let registerValidationSchema = {
        body: joi.object({
            firstName: joi.string().required().min(3).max(20),
            lastName: joi.string().required().min(3).max(20),
            email: joi.string().required().email(),
            password: joi.string().required(),
            cpassword: joi.ref('password')
        }).required()
    }

    let { error } = registerValidationSchema.body.validate(req.body)
    if (error) {
        const msg = error.details[0].message
        throw new AppError(400,msg)
    }
    else return next()
}
let loginValidator = (req, res, next) => {

    let loginValidationSchema = {
        body: joi.object({
            email: joi.string().required().email(),
            password: joi.string().required()
        }).required()
    }

    let { error } = loginValidationSchema.body.validate(req.body)
    if (error) {
        const msg = error.details[0].message
        throw new AppError(400,msg)
    }
    else return next()
}
let editValidator = (req,res,next)=>{
    let editValidationSchema = {
        body:joi.object({
            firstName: joi.string().min(3).max(20),
            lastName: joi.string().min(3).max(20),
            email: joi.string().email(),
            profileImg: joi.string()
        })
    }
    let { error } = editValidationSchema.body.validate(req.body)
    if (error) {
        const msg = error.details[0].message
        throw new AppError(400,msg)
    }
    else return next()
}
module.exports = { registerValidator, loginValidator ,editValidator}
