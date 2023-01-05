const messageModel = require('./message.model')
const io = require('../../socket')

let createMessage = async (req, res) => {
    io.getIo().emit('newMessgae')
    let recievedId = req.params.id
    let { message } = req.body
    await messageModel.insertMany({ recievedId: recievedId, message: message })
    res.status(200).json({ message: 'message sent successfully' })
}


let getUserMessages = async (req, res) => {
    let id = req.user
    let userMessages = await messageModel.find({ recievedId: id }).populate('recievedId')
    res.json({ messages: userMessages })
}

module.exports = {
    createMessage, getUserMessages
}
