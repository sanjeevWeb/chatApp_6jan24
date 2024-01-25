const router = require('express').Router()
const authenticate = require('../auth/authenticate.js')
const { saveChat, getAllChatsOfLoggedInUser, getAllChatsOfAllUsers } = require('../controllers/chat.controller.js')


router.get('/getchat', authenticate, getAllChatsOfLoggedInUser)

router.get('/getallchats', authenticate, getAllChatsOfAllUsers)

router.post('/savechat', authenticate, saveChat)

module.exports = router