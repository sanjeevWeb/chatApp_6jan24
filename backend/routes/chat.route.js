const authencateUser = require('../auth/authenticate.js')
const { saveChat, sendAllChat } = require('../controllers/chat.controller.js')

const router = require('express').Router()

//middleware function
// router.use(authencateUser)

// router.route('/').post(saveChat)

router.post('/', authencateUser, saveChat)

router.get('/data', authencateUser, sendAllChat)

module.exports = router