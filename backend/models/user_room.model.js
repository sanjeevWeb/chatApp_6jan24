const { DataTypes } = require('sequelize')
const sequelize = require('../db/database.js')

const user_room = sequelize.define('Userroom', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING
    }
}, { timestamps: true})


sequelize.sync({force:false})
.then(() => {
    console.log('user_romm table created')
})
.catch(err => console.log(err))

module.exports = user_room