const { DataTypes } = require('sequelize')
const sequelize = require('../db/database.js')

const room = sequelize.define('Room', {
    roomName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true })


sequelize.sync({ force:false })
    .then(() => {
        console.log('room table created successfully')
    })
    .catch(err => console.log(err))

module.exports = room