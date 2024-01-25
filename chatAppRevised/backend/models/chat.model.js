const { DataTypes } = require('sequelize')
const sequelize = require('../db/database.js')

const Chat = sequelize.define('Chat', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true})


module.exports = Chat