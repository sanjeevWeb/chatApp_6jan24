const { DataTypes } = require('sequelize')
const sequelize = require('../db/database.js')
const user = require('./user.model.js')

const room = sequelize.define('Room', {
    roomName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true })

// room.belongsTo(user,{foreignKey: 'AdminId',constraints:true,onDelete:'CASCADE'})

sequelize.sync({ force:false })
    .then(() => {
        console.log('room table created successfully')
    })
    .catch(err => console.log(err))

module.exports = room