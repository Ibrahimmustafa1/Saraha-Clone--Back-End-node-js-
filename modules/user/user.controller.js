const userModel = require('./user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let AppError = require('../../utils/AppError')
let signup = async (req, res) => {

    let { firstName, lastName, email, password } = req.body

    let found = await userModel.findOne({ email: email })
    if (found) {
        throw new AppError(400, 'email already registerd')
    }
    else {
        let user = new userModel({ firstName, lastName, email, password })
        await user.save();
        res.status(200).json({ msg: 'user registered successfully' })
    }
}

let signin = async (req, res) => {
    let { email, password } = req.body
    let foundUser = await userModel.findOne({ email: email })
    if (foundUser) {
        let match = bcrypt.compareSync(password, foundUser.password);
        if (match) {
            let token = jwt.sign({ id: foundUser._id, email: foundUser.email, firstName: foundUser.firstName, lastName: foundUser.lastName }, 'thistopsecret')
            res.status(200).json({ message: 'user loged in successfully', token })
        }
        else {
            throw new AppError(403, 'Invalid Credentials')
        }
    }
    else {
        throw new AppError(400, 'user not found')
    }
}
let editProfile = async (req, res) => {
    let img;
    if (req.file) {
        img = 'http://localhost:3000/' + req.file.filename
    }
    else {
        img = req.body.profileImg
    }
    let { firstName, lastName, email } = req.body
    await userModel.findByIdAndUpdate(req.user, { profileImg: img, firstName, lastName, email })
    res.json({ msg: 'done' })

}
let getUserProfileData = async (req, res) => {
    let userData = await userModel.findById(req.user,'-password')
    res.json(userData)
}
let userMetaData=async (req, res) => {
    let userData = await userModel.findById(req.params.id,'-password -_id')
    res.json(userData)
}
module.exports = {
    signup, signin, editProfile, getUserProfileData,userMetaData
}