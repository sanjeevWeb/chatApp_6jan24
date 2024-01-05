const { DataTypes } = require('sequelize')
const sequelize = require('../db/database.js')

const user = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: true,
    },
    phone_no: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {timestamps:true})

sequelize.sync({force: true})
.then(() => {
    console.log('user table created successfully')
})
.catch(err => console.log(err))

module.exports = user