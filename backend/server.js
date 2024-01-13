require('dotenv').config({ path: './.env' })

const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/user.route.js')
const chatRouter = require('./routes/chat.route.js')
const roomRouter = require('./routes/room.route.js')

const app = express();

//middlewares
app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: 'include'
}))
app.use(express.urlencoded({ extended: false }))

// route middlewares
app.use('/user', userRouter)
app.use('/chat', chatRouter)
app.use('/rooms', roomRouter)

app.listen(process.env.PORT, () => {
    console.log(`server running at port ${process.env.PORT}`)
})