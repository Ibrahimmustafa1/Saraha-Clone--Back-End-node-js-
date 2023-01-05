const router = require('express').Router()
const { signin, signup, editProfile ,getUserProfileData,userMetaData} = require('./user.controller')
const { registerValidator, loginValidator,editValidator } = require('../../validation/user.validation')
let isAuth = require('../../authMiddlewares/isAuth')
let AppError = require('../../utils/AppError')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      
        cb(null, file.originalname)
    },
})
function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith('image'))
        cb(null, true)
    else{

        cb(new Error('only image is supported'))
    }
}
const upload = multer({ storage: storage,fileFilter })

let catchAsync = require('../../utils/catchAsync')
router.post('/signup', registerValidator, catchAsync(signup))
router.get('/profile', isAuth,catchAsync(getUserProfileData))
router.get('/metaData/:id',catchAsync(userMetaData))
router.post('/login', loginValidator, catchAsync(signin))
router.put('/editprofile', isAuth ,upload.single("profileImg"),editValidator, catchAsync(editProfile))
module.exports = router