const user = require("../models/user.model.js")
const bcrypt = require('bcryptjs')

const getSignedUp = async (req,res) => {
    const {username, email, phone_no, password} = req.body
    if(!username || !email || !phone_no || !password){
        return res.json({ error: 'all fields are required'})
    }
    const isExist = await user.findOne({ where: { email }});
    if(isExist){
        return res.json({ error: 'email already registered, please login'})
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const isCreated = await user.create({ username, email, phone_no, password:hash});
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
    const isExist = await user.findOne({ where: { email }});
    if(!isExist){
        return res.json({ error: 'you are not registered'})
    }
    const isMatched = await bcrypt.compare(password, isExist.dataValues.password);
    if(!isMatched){
        return res.json({ error: 'wrong credencials'})
    }
    return res.json({ message: 'logged in successfully'})
}

module.exports = {
    getSignedUp,
    getLoggedIn
}