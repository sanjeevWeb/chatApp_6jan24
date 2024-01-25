const authenticateUser = require('../auth/authenticate.js')
const { createNewRoom, getAllRooms, joinNewRoom, getAllUsersOfRoom, getRoomsJoinedByLoggedInUser, getChatsOfActiveRoom, removeUserFromRoom } = require('../controllers/room.controller.js')

const router = require('express').Router()

router.get('/getall', getAllRooms)

router.get('/getusers', getAllUsersOfRoom )

router.get('/joinedrooms', authenticateUser, getRoomsJoinedByLoggedInUser)

router.get('/getchats', authenticateUser, getChatsOfActiveRoom)

router.post('/create', authenticateUser, createNewRoom)

router.post('/join', authenticateUser, joinNewRoom)

router.delete('/remove', authenticateUser, removeUserFromRoom)

module.exports = router