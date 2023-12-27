'use strict'
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const auth = require('../middleware/auth')
const client = require('../db/postgres')
const createUser = require('../db/user')

const router = new express.Router()

//CREATE USER
router.post('/user', async (req, res) => {
  try {
    console.log('create new user')
    const user = await createUser(req.body)
    await client.connect()
    const result = await client.query(`INSERT INTO users (email, password, username) VALUES ('${user.email}', '${user.password}', '${user.username}') RETURNING user_id;`)
    const token = jwt.sign({ _id: result.rows[0] }, process.env.JWT_SECRET)
    res.status(201).send({ ...result.rows[0], token })
    await client.end()
    console.log('client has disconnected')
  } catch (e) {
    // console.log(e)
    res.status(400).send(e.toString())
  }
})

//LOGIN USER
router.post('/user/login', async (req, res) => {
  try {
    console.log('login user')
    const encryptedPassword = await bcrypt.hash(req.body.password, 10)
    console.log('asdf', encryptedPassword)
    await client.connect()
    const result = await client.query(`SELECT * FROM users;`)
    // const result = await client.query(`SELECT * FOM users WHERE email = '${req.body.email}' AND password = '${encryptedPassword}';`)
    res.status(201).send(result)
    await client.end()
    console.log('client has disconnected')
  } catch (e) {
    res.status(400).send(e.toString())
  }
})

//LOGOUT USER CURRENT SESSION
router.post('/user/logout', auth, async (req, res) => {
  try {
    //remove current tokenfrom db
    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

//LOGOUT USER ALL SESSIONS
router.post('/user/logoutAll', auth, async (req, res) => {
  try {
    //remove all tokens from db
    res.send()
  } catch (e) {
    res.status(500).send(e)
  }
})

//GET USER
router.get('/user/profile', auth, async (req, res) => {
  try {
    res.status(200).send(req.user)
  } catch (e) {
    res.status(500).send(e)
  }
})

//UPDATE USER
router.patch('/user/profile', auth, async (req, res) => {
  try {
    //update user in db
    res.send(req.user)
  } catch (e) {
    res.status(500).send(e)
  }
})

//DELETE USER
router.delete('/user', auth, async (req, res) => {
  try {
    //delete user from db
    res.send(req.user)
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router