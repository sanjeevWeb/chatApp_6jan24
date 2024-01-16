const authencateUser = require('../auth/authenticate.js');
const { getAllRooms, getAllUsersOfRoom, getAllChatsInRoom, createNewRoom, addUserToRoom, addChatInRoom } = require('../controllers/room.controller.js');

const router = require('express').Router();

router.post('/', authencateUser, createNewRoom);

router.post('/:roomId/adduser', authencateUser, addUserToRoom)

router.post('/:roomId/chats', authencateUser, addChatInRoom)

router.get('/', getAllRooms);

router.get('/:roomId/users', getAllUsersOfRoom);

router.get('/:roomId/chats', getAllChatsInRoom);

module.exports = router