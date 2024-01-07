const user = require("../models/user.model.js")
const bcrypt = require('bcryptjs')

const getSignedUp = async (req,res) => {
    const {username, email, phone_no, password} = req.body
    if(!username || !email || !phone_no || !password){
        return res.json({ error: 'all fields are required'})
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const isCreated = await user.create({ username, email, phone_no, password:hash});
    if(!isCreated){
        return res.json({ error: 'something broke, please retry'})
    }
    return res.json({ message: 'user created successfully'})
}

module.exports = {
    getSignedUp
}