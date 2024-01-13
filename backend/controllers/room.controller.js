const chat = require("../models/chat.model");
const room = require("../models/room.model");
const user = require("../models/user.model");

const createNewRoom = async (req, res) => {
    try {
        const { roomName } = req.body;
        if (!roomName) {
            return res.json({ error: 'something wrong' })
        }
        const result = await room.create({ roomName })
        console.log('returned room', result);
        return res.json({ result })
    }
    catch (error) {
        console.log(error)
    }
}

const getAllRooms = async (req, res) => {
    try {
        const result = await room.findAll()  //{ attributes: ['roomName']}
        console.log('allRooms', result);
        res.json({ result })
    }
     catch (error) {
        console.log(error)    
    }
}

const getAllUsersOfRoom = async(req, res) => {
    try {
        const roomId = req.params.roomId;
        const allUsers = await user.findAll({ where: {roomId}, attributes: ['username']})    
        console.log('users in room ',allUsers);
        return res.json({ allUsers })
    }
     catch (error) {
        
    }
    
}

const getAllChatsInRoom = async (req, res) => {
    try {
        const roomId = req.params.roomId;
        const allChats = await chat.findAll({ where: { roomId }, attributes: ['message']})    
        console.log('allhcats of a room ', allChats);
        return res.json({ allChats })
    }
     catch (error) {
        
    }
}

module.exports = {
    createNewRoom,
    getAllRooms,
    getAllUsersOfRoom,
    getAllChatsInRoom
}