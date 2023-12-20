const { Client } = require('pg')
const client = new Client({
  user: 'db_user',
  host: 'localhost',
  port: 5432,
  database: 'recipeDatabase'
})

client.on('error', (err) => {
  console.error('something bad has happened!', err.stack)
})

module.exports = client