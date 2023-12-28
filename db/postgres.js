const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  user: 'db_user',
  port: 5432,
  database: 'recipeDatabase',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

pool.on('connect', (client) => {
  console.log('pool connected')
})

pool.on('error', (err) => {
  console.error('something bad has happened!', err.stack)
})

module.exports = pool