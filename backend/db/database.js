const Sequelize = require('sequelize');
require('dotenv').config({ path: '../backend/.env'})

const sequelize = new Sequelize(process.env.DATABASE,process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD,{
    host: process.env.DATABASE_HOST,
    dialect: 'mysql' // dialect need to explicitly defined
})

sequelize.authenticate()
.then(() => {
    console.log('Database connected successfully')
})
.catch(err => {
    console.log('Not able to connect',err)
})

module.exports = sequelize