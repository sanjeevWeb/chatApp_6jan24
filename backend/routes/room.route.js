const { getAllRooms, getAllUsersOfRoom, getAllChatsInRoom, createNewRoom } = require('../controllers/room.controller.js');

const router = require('express').Router();

router.post('/', createNewRoom);

router.get('/', getAllRooms);

router.get('/:roomId/users', getAllUsersOfRoom);

router.get('/:roomId/chats', getAllChatsInRoom);

module.exports = router