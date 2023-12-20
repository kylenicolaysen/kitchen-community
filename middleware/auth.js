const client = require('../db/postgres')

const auth = async (req, res, next) => {
  try {
    await client.connect()
    const result = await client.query("SELECT * FROM users WHERE email = 'email@example.com';")
    // const result = await client.query(`INSERT INTO users (email, password) VALUES ('${req.body.email}', '${req.body.password}');`))
    req.user = { email: result.rows[0].email, username: result.rows[0].username }
    next()
  } catch (e) {
    console.log(e) //REMOVE FOR PROD
    res.status(401).send({ Error: 'Unable to authenticate' })
  }
}

module.exports = auth
