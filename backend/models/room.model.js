const { DataTypes } = require('sequelize')
const sequelize = require('../db/database.js')
const user = require('./user.model.js')


const room = sequelize.define('Room', {
    roomName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true })

// user.belongsToMany(room, {
//     through: "user_room",
//     as: "rooms",
//     foreignKey: "userId",
// })

// Define the association function
const associate = () => {
    room.belongsToMany(user, {
        through: "user_room",
        as: "users",
        foreignKey: "roomId",
    });
};

sequelize.sync()
    .then(() => {
        console.log('room table created successfully')
        associate()
    })
    .catch(err => console.log(err))

    // room.belongsToMany(user, {
    //     through: "user_room",
    //     as: "users",
    //     foreignKey: "roomId",
    // })

module.exports = room