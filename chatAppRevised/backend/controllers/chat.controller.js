const Chat = require("../models/chat.model.js");

const saveChat = async (req, res) => {
    try {
        const { message, roomId } = req.body
        const user = req.user;
        // Find the user instance first
        const result = await user.createChat({ message, RoomId: roomId })
        // const result = await Chat.create({ message,userId })
        console.log(result)
        return res.json({ result })
    }
    catch (error) {
        console.log(error)
    }
}

const getAllChatsOfLoggedInUser = async (req,res,next) => {
    try {
        const user = req.user;
        const allChats = await user.getChats()
        console.log(allChats)
        if(!allChats || allChats.length == 0){
            return res.json({ message: 'No chats to show'})
        }
        return res.json({ allChats })
    }
     catch (error) {
        console.log(error)
    }
}

const getAllChatsOfAllUsers = async (req,res,next) => {
    try {
        const user = req.user
        const roomId = req.query;
        const allChats = await Chat.findAll({ where: { RoomId: roomId, UserId: user.dataValues.id}});
        console.log(allChats);
        if(!allChats || allChats.length == 0){
            return res.json({ message: 'No chats to show'})
        }
        return res.json({ allChats })
    }
     catch (error) {
        console.log(error)
    }
}

module.exports = {
    saveChat,
    getAllChatsOfLoggedInUser,
    getAllChatsOfAllUsers
}