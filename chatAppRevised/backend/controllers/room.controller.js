const Room = require("../models/room.model.js");
const User = require("../models/user.model.js");

const createNewRoom = async (req, res, next) => {
    try {
        const user = req.user;
        const { roomName } = req.body
        const result = await user.createRoom({ roomName, AdminId: user.dataValues.id })
        console.log('room created', result)
        return res.json({ message: 'room created successfully', result })
    }
    catch (error) {
        console.log(error)
    }
}

const getAllRooms = async (req, res) => {
    try {
        const allRooms = await Room.findAll();
        console.log(allRooms)
        if (!allRooms || allRooms.length == 0) {
            return res.json({ message: 'No rooms to show' })
        }
        return res.json({ allRooms })
    }
    catch (error) {
        console.log(error)
    }
}

const joinNewRoom = async (req, res) => {
    try {
        const { roomId } = req.body;
        const user = req.user;

        // Find the room by ID
        const room = await Room.findByPk(roomId);

        // Check if the user is already joined in the room
        const isJoined = await room.hasUser(user);
        if (isJoined) {
            return res.json({ message: 'User is already joined in the room' });
        }

        // Join the user to the room
        await room.addUser(user);

        console.log('User joined the room successfully');
        return res.json({ isJoined: true });
    }
    catch (error) {
        console.log(error)
    }
}

const getAllUsersOfRoom = async (req, res) => {
    try {
        const { roomId } = req.query
        // Find the room by ID
        const room = await Room.findByPk(roomId);

        if (!room) {
            return res.json({ message: 'Room not found' });
        }
        // Get all users in the room
        const allUsers = await room.getUsers();

        if (!allUsers || allUsers.length == 0) {
            return res.json({ message: 'No User in this room' })
        }
        return res.json({ allUsers })
    }
    catch (error) {
        console.log(error)
    }
}

const getRoomsJoinedByLoggedInUser = async (req, res) => {
    const user = req.user
    const joinedRooms = await user.getRooms()
    if (!joinedRooms || joinedRooms.length == 0) {
        return res.json({ message: 'you have not joined any room' })
    }
    return res.json({ joinedRooms })
}

const getChatsOfActiveRoom = async (req, res) => {
    const user = req.user
    const { roomId } = req.query
    const room = await Room.findByPk(roomId)
    if (!room) {
        return res.json({ message: 'Room not found' });
    }
    const allChats = await room.getChats()
    if (!allChats || allChats.length == 0) {
        return res.json({ message: 'No chats found' })
    }
    return res.json({ allChats })
}

const removeUserFromRoom = async (req, res) => {
    const { roomId, userId } = req.query
    const room = await Room.findByPk(roomId)
    if (!room) {
        return res.json({ message: 'room not found ' })
    }
    const user = await User.findByPk(userId);

    if (!user) {
        return res.json({ message: 'User not found' });
    }

    // Remove the association between the user and the room
    await room.removeUsers(user);

    return res.json({ message: 'User removed from room successfully' });
}

module.exports = {
    createNewRoom,
    getAllRooms,
    joinNewRoom,
    getAllUsersOfRoom,
    getRoomsJoinedByLoggedInUser,
    getChatsOfActiveRoom,
    removeUserFromRoom
}