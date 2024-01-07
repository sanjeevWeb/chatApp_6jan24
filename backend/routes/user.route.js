const { getSignedUp, getLoggedIn } = require('../controllers/user.controller.js')

const router = require('express').Router()

router.route('/signup').post(getSignedUp)
// router.post('/signup', getSignedUp)

router.route('/login').post(getLoggedIn)

module.exports = router