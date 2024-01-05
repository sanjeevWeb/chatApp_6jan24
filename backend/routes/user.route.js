const { getSignedUp } = require('../controllers/user.controller.js')

const router = require('express').Router()

// router.route('/signup').post(getSignedUp)
router.post('/signup', getSignedUp)

module.exports = router