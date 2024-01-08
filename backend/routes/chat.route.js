const authencateUser = require('../auth/authenticate.js')
const { saveChat } = require('../controllers/chat.controller.js')

const router = require('express').Router()

//middleware function
// router.use(authencateUser)

// router.route('/').post(saveChat)

router.post('/', authencateUser, saveChat)

module.exports = router