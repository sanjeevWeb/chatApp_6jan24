const chat = require("../models/chat.model.js")

const saveChat = async (req, res) => {
    try {
        const userId = req.user.id
        const { message } = req.body
        const result = await chat.create({ message, userId: userId })
        return res.json({ message: message })
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    saveChat
}