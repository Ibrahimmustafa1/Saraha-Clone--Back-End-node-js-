const mongoose = require('mongoose')

let messgaeSchema = new mongoose.Schema({

    message:{
        type:String
    },
    recievedId:{ 
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User'
    }
    
})

module.exports = mongoose.model('Message',messgaeSchema)