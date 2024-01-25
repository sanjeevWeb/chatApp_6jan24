const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");


const userroom = sequelize.define('Userroom', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, { timestamps: false})

module.exports = userroom