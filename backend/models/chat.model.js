const { DataTypes } = require('sequelize')
const sequelize = require('../db/database.js')
const user = require('./user.model.js')
const room = require('./room.model.js')

const chat = sequelize.define('Chat', {
    message: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true})

user.hasMany(chat, {foreignKey : 'userId'})
chat.belongsTo(user,  {foreignKey : 'userId'})

room.hasMany(chat)
chat.belongsTo(room)

sequelize.sync({ force: false })
.then(() => {
    console.log('chat table created successfully')
})
.catch(err => console.log(err))

module.exports = chat