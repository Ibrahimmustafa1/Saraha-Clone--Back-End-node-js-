let jwt = require('jsonwebtoken');
let AppError = require('../utils/AppError')
let userModel = require('../modules/user/user.model')

module.exports =  (req, res, next) => {
    if (req.headers.token) {
        let { token } = req.headers
        jwt.verify(token, 'thistopsecret', async function (err, decoded) {
            if (decoded) {
                let { id } = decoded
                let found = await userModel.findById(id)
                console.log(found)
                if (found) {
                    req.user = id
                    next()
                }
                else {
                    next( new AppError(404,'user not found'))
                }
            }
            else {

                next( new AppError(404,'Invalid Token'))
                // res.status(400).json({msg:'Invalid token'})
            }
        });
    }
    else {
        console.log('x')
        throw   new AppError(404,'Invalid Token')
    }
    
}