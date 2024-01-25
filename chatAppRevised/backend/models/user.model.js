const { DataTypes } = require('sequelize')
const sequelize = require('../db/database.js')

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
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
}, { timestamps: true })


module.exports = User
// isImage: {
//     type: DataTypes.STRING,
// },
// name: {
//     type: DataTypes.STRING,
// },
// data: {
//     type: DataTypes.BLOB("long"),
// },