const express = require('express')
const userRouter = require('./routers/user')
const recipeRouter = require('./routers/recipe')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(recipeRouter)
app.get('/', (req, res) => {
  res.send('hello world')
})

module.exports = app