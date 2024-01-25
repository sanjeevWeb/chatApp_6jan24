const User = require("../models/user.model.js")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getSignedUp = async (req,res) => {
    const {username, email, phone_no, password} = req.body
    if(!username || !email || !phone_no || !password){
        return res.json({ error: 'all fields are required'})
    }
    const isExist = await User.findOne({ where: { email }});
    if(isExist){
        return res.json({ error: 'email already registered, please login'})
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const isCreated = await User.create({ username, email, phone_no, password:hash});
    if(!isCreated){
        return res.json({ error: 'something broke, please retry'})
    }
    return res.json({ message: 'Successfuly signed up'})
}

const getLoggedIn = async (req,res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.json({ error: 'all fields are required'})
    }
    const isExist = await User.findOne({ where: { email }});
    if(!isExist){
        return res.json({ error: 'you are not registered', status: 404})
    }
    const isMatched = await bcrypt.compare(password, isExist.dataValues.password);
    if(!isMatched){
        // this code is only sending status with error code and returs isExist.e. not sending message
        // return res.status(401).json({ error: 'user not authorized', status: 401})
        return res.json({ error: 'user not authorized', status: 401})
    }
    const token = jwt.sign({ id:isExist.dataValues.id}, process.env.JWT_SECRET_KEY)
    return res.json({ message: 'logged in successfully', token})
}

module.exports = {
    getSignedUp,
    getLoggedIn
}