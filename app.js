const express = require('express')
const userRouter = require('./routers/user')

const app = express()

app.use(express.json())
app.use(userRouter)
app.get('/', (req, res) => {
  res.send('hello world')
})

module.exports = app