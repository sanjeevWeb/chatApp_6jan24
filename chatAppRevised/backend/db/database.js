const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER,process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql'
})

sequelize.authenticate()
.then(() => {
    console.log('newchatapp database connected')
})
.catch((error) => console.log(error))

module.exports = sequelize

