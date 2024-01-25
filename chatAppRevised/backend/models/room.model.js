const { DataTypes } = require('sequelize')
const sequelize = require('../db/database.js')

const Room = sequelize.define('Room', {
    roomName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true })


module.exports = Room
// room.belongsTo(user,{foreignKey: 'AdminId',constraints:true,onDelete:'CASCADE'})