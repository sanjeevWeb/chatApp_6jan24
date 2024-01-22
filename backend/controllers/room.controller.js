const chat = require("../models/chat.model.js");
const room = require("../models/room.model.js");
const user = require("../models/user.model.js");
const user_room = require("../models/user_room.model.js");

const createNewRoom = async (req, res) => {
    try {
        const userId = req.user.id 
        const username = req.user.username
        const { roomName } = req.body;
        if (!roomName) {
            return res.json({ error: 'something wrong' })
        }
        const result = await user.createRoom({ roomName }) //AdminId:userId 
        // look for the membersIds later
        console.log('returned room', result);
        return res.json({ result })
    }
    catch (error) {
        console.log(error)
    }
}

const getAllRooms = async (req, res) => {
    try {
        // const result = await room.findAll()  //{ attributes: ['roomName']}
        // console.log('allRooms', result);
        // const rooms = await user.getRoom(); // throwing error htat user.getRoom() is not a function
        const rooms = await room.findAll()
        return res.json({ rooms, message: "All groups succesfully fetched" })
        res.json({ result })
    }
    catch (error) {
        console.log(error)
    }
}

const getRoomMembersbyId = async (request, response, next) => {
    try {
        const { groupId } = request.query;
        const group = await room.findOne({ where: { id: Number(groupId) } });
        const AllusersData = await room.getUsers();
        const users = AllusersData.map((ele) => {
            return {
                id: ele.id,
                name: ele.name,
            }
        })

        response.status(200).json({ users, message: "Group members name succesfully fetched" })
    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Internal Server error!' })
    }
}


const getAllUsersOfRoom = async (req, res) => {
    try {
        const roomId = req.params.roomId;
        const allUsers = await user_room.findAll({ where: { roomId }, attributes: ['username'] })
        console.log('users in room ', allUsers);
        return res.json({ allUsers })
    }
    catch (error) {
        console.log(error)
    }

}

const getAllChatsInRoom = async (req, res) => {
    try {
        const roomId = req.params.roomId;
        const allChats = await chat.findAll({ where: { roomId }, attributes: ['message'] })
        console.log('allhcats of a room ', allChats);
        return res.json({ allChats })
    }
    catch (error) {

    }
}

const addChatInRoom = async (req,res) => {
    try {
        const userId = req.user.id;
        const roomId = req.params.roomId
        const {content} = req.body
        const result = await chat.create({ message: content, roomId, userId})
        console.log('new chat result: ', result)
        return res.json({ message: 'chat added'})
    }
     catch (error) {
        console.log(error)    
    }
}

const addUserToRoom = async (req, res) => {
    try {
        const roomId = req.params.roomId;
        const userId = req.user.userId;
        const result = await room.createUser({ userId,roomId })
        if(!result){
            return res.json({ error: 'something broke'})
        }
        return res.json({ result })
    }
    catch (error) {
        console.log('error', error)
    }
}

module.exports = {
    createNewRoom,
    getAllRooms,
    getAllUsersOfRoom,
    getAllChatsInRoom,
    addChatInRoom,
    addUserToRoom
}