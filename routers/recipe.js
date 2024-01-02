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

//GET ALL RECIPES
router.get('/recipe/all', async (req, res) => {
  try {
    console.log('get all recipes')
    await pool.connect()
    const result = await pool.query(`SELECT * FROM recipe;`)
    res.status(200).send(result)
  } catch (e) {
    res.status(500).send(e)
  }
})

//GET A RECIPE
router.get('/recipe/:id', async (req, res) => {
  try {
    console.log('get a recipe')
    console.log(req.params.id)
    await pool.connect()
    const result = await pool.query(`SELECT * FROM recipe WHERE recipe_id = ${req.params.id};`)
    res.send(result.rows[0])
  } catch (e) {
    res.status(500).send(e)
  }
})

//UPDATE RECIPE
router.patch('/recipe/:id', auth, async (req, res) => {
  try {
    res.send('update recipe route')
  } catch (e) {
    res.status(500).send(e)
  }
})

//DELETE RECIPE
router.delete('/user', auth, async (req, res) => {
  try {
    res.send('deleted recipe route')
  } catch (e) {
    res.status(500).send(es)
  }
})

module.exports = router