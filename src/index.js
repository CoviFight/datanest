const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const dataRouter = require('./routers/data')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(dataRouter)

app.get('/', (req, res) => {
    res.send('Go Corona Go')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})