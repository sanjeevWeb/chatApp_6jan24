require('dotenv').config({ path: './.env'})

const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/user.route.js')

const app = express();

//middlewares
app.use(express.json());
app.use(cors({
    origin: '*',
    credentials:'include'
}))

// route middlewares
app.use('/user', userRouter)

app.listen(process.env.PORT, () => {
    console.log(`server running at port ${process.env.PORT}`)
})