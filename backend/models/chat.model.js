const { DataTypes } = require('sequelize')
const sequelize = require('../db/database.js')
const user = require('./user.model.js')

const chat = sequelize.define('Chat', {
    message: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true})

user.hasMany(chat, {foreignKey : 'userId'})
chat.belongsTo(user,  {foreignKey : 'userId'})


sequelize.sync({ force: false})
.then(() => {
    console.log('chat table created successfully')
})
.catch(err => console.log(err))

module.exports = chat