const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')

const app = express()

app.use(express.json())
app.use(userRouter)

app.get('/', (req, res) => {
    res.send('Go Corona Go')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})