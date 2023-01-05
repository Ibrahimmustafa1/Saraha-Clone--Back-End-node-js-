const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;
let userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImg:{
        type: String,
    }
})
userSchema.pre('save', function(){
    this.password = bcrypt.hashSync(this.password, saltRounds);
})

module.exports = mongoose.model('User',userSchema)