'use strict'
const express = require('express')
const auth = require('../middleware/auth')
const client = require('../db/postgres')
const createUser = require('../db/user')
console.log(typeof createUser)

const router = new express.Router()

//CREATE USER
router.post('/user', async (req, res) => {
  try {
    console.log('create new user')
    const user = await createUser(req.body)
    console.log(user)
    await client.connect()
    const result = await client.query(`INSERT INTO users (email, password, username) VALUES ('${user.email}', '${user.password}', '${user.username}');`)
    res.status(201).send(result)
  } catch (e) {
    console.log(e)
    res.status(400).send(e.toString())
  }
})

//LOGIN USER
router.post('/user/login', async (req, res) => {
  try {
    //try to log in
    res.status(201).send('LOGGED IN (return token/user)')
  } catch (e) {
    res.status(400).send(e)
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