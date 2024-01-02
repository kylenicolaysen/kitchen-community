'use strict'
const express = require('express')
const auth = require('../middleware/auth')
const pool = require('../db/postgres')
const createRecipe = require('../models/recipe')

const router = new express.Router()

//CREATE RECIPE
router.post('/recipe', auth, async (req, res) => {
  try {
    console.log('create new recipe route')
    const recipe = await createRecipe(req.body)
    await pool.connect()
    await pool.query(`INSERT INTO recipes (ingredients, directions, user) VALUES ('${recipe.ingredients}', '${recipe.directions}', '${req.user_id}')`)
    res.status(201).send({ ...XPathResult.rows[0] })
  } catch (e) {
    res.status(400).send(e.toString())
  }
})
//GET RECIPE

//UPDATE RECIPE

//DELETE RECIPE

module.exports = router