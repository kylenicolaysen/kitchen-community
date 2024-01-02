'use strict'
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const auth = require('../middleware/auth')
const pool = require('../db/postgres')
const createUser = require('../models/user')

const router = new express.Router()

//CREATE USER
router.post('/user', async (req, res) => {
  try {
    console.log('create new user route')
    const user = await createUser(req.body)
    await pool.connect()
    const result = await pool.query(`INSERT INTO users (email, password, username) VALUES ('${user.email}', '${user.password}', '${user.username}') RETURNING user_id;`)
    const token = jwt.sign({ _id: result.rows[0] }, process.env.JWT_SECRET)
    res.status(201).send({ ...result.rows[0], token })
  } catch (e) {
    res.status(400).send(e.toString())
  }
})

//LOGIN USER
router.post('/user/login', async (req, res) => {
  try {
    console.log('login user route')
    await pool.connect()
    const result = await pool.query(`SELECT user_id, password FROM users WHERE email = '${req.body.email}';`)
    if (result.rows.length === 0) {
      res.status(401).send('invalid user/pw')
    } else {
      const validatedUser = await bcrypt.compare(req.body.password, result.rows[0].password)
      if (!validatedUser) {
        res.status(401).send('invalid user/pw')
      } else {
        console.log(result.rows[0].user_id)
        const token = jwt.sign({ _id: result.rows[0].user_id }, process.env.JWT_SECRET)
        res.status(200).send({ user_id: result.rows[0].user_id, token })
      }
    }
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
    console.log('get user route')
    await pool.connect()
    const result = await pool.query(`SELECT user_id, email, username FROM users WHERE user_id = ${req.user_id}`)
    res.status(200).send(result.rows[0])
  } catch (e) {
    res.status(500).send(e)
  }
})

//UPDATE USER
router.patch('/user/profile', auth, async (req, res) => {
  try {
    //update user in db
    res.send('Update user route needs updating')
  } catch (e) {
    res.status(500).send(e)
  }
})

//DELETE USER
router.delete('/user', auth, async (req, res) => {
  try {
    console.log('delete user route')
    await pool.connect()
    const result = await pool.query(`DELETE FROM users WHERE user_id = ${req.user_id}`)
    res.send(result) //need to fix return
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router