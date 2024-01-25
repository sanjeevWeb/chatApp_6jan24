require('dotenv').config()
const express = require('express')
const cors = require('cors')

//router imports
const userRoute = require('./routes/user.route.js')
const chatRouter = require('./routes/chat.route.js')
const roomRouter = require('./routes/room.route.js')

const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

//database tables
const User = require('./models/user.model.js')
const Chat = require('./models/chat.model.js')
const Room = require('./models/room.model.js')
const userroom = require('./models/Userroom.model.js')
const sequelize = require('./db/database.js')

//database table associations
User.hasMany(Chat)
Chat.belongsTo(User)

Room.hasMany(Chat)
Chat.belongsTo(Room)

User.belongsToMany(Room, { through: userroom})
Room.belongsToMany(User, { through: userroom})

//for including a column named adminId
Room.belongsTo(User,{foreignKey: 'AdminId',constraints:true,onDelete:'CASCADE'})

sequelize.sync({ force: false })
.then(() => {
    console.log('tables created successfullly')
})
.catch((error) => console.log(error))

//route middlewares
app.use('/user', userRoute)
app.use('/chat',chatRouter)
app.use('/room', roomRouter)

app.listen(5000, () => {
    console.log('app listening at 5000')
})