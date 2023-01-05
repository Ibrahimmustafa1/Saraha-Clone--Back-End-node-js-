const mongoose=require('mongoose')

module.exports = () => {
    return mongoose.connect('mongodb://localhost:27017/saraha').then(() => {
        console.log('Connected to MongoDB')
    }).catch(err => console.log(err))
}