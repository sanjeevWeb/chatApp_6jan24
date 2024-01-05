require('dotenv').config({ path: './.env'})

const express = require('express')
const userRouter = require('./routes/user.route.js')

const app = express();
app.use(express.json());

app.use('/user', userRouter)

app.listen(process.env.PORT, () => {
    console.log(`server running at port ${process.env.PORT}`)
})