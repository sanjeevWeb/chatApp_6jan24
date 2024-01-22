const jwt = require('jsonwebtoken');
const user = require('../models/user.model.js');

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        // const token = req.headers.Authorization;
        console.log('token', token)
        if (!token) {
            return res.json({ error: 'user not authorized' })
        }
        const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log('jwt payload :', isVerified)
        const userData = await user.findOne({ where: { id: isVerified.id } })
        console.log('userData ', userData)
        if(!userData){
            return res.json({ error: 'not a valid user'})
        }
        req.user = userData.dataValues;
        next()
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = authenticateUser;