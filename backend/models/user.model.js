const { DataTypes } = require('sequelize')
const sequelize = require('../db/database.js')
const room = require('./room.model.js')

const user = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone_no: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // isImage: {
    //     type: DataTypes.STRING,
    // },
    // name: {
    //     type: DataTypes.STRING,
    // },
    // data: {
    //     type: DataTypes.BLOB("long"),
    // },
}, { timestamps: true })



// room.belongsToMany(user, {
//     through: "user_room",
//     as: "rooms",
//     foreignKey: "userId",
// })

// Define the association function
const associate = () => {
    user.belongsToMany(room, {
        through: "Userroom",
        as: "rooms",
        foreignKey: "userId",
    });

    room.belongsToMany(user, {
        through: "Userroom",
        as: "users",
        foreignKey: "roomId",
    });

    // room.belongsTo(user,{foreignKey: 'AdminId',constraints:true,onDelete:'CASCADE'})

};

sequelize.sync({ force: false })
    .then(() => {
        console.log('user table created successfully')
        associate()
    })
    .catch(err => console.log(err))

// user.belongsToMany(room, {
//     through: "user_room",
//     as: "rooms",
//     foreignKey: "userId",
// })

module.exports = user