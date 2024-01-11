const chat = require("../models/chat.model.js")

const saveChat = async (req, res) => {
    try {
        const userId = req.user.id
        let { message } = req.body
        message = req.user.username + ': ' + message
        const result = await chat.create({ message, userId: userId })
        return res.json({ message: message })
    }
    catch (error) {
        console.log(error)
    }
}

const sendAllChat = async(req,res) => {
    try {
        const userId = req.user.id;
        const allMessages = await chat.findAll({ attributes: ['message']});    
        console.log('allmessages: ', allMessages)
        return res.json({ allMessages })
    }
     catch (error) {
        console.log(error)
    }
}

module.exports = {
    saveChat,
    sendAllChat
}