const jwt = require('jsonwebtoken')
const pool = require('../db/postgres')

const auth = async (req, res, next) => {
  try {
    const auth = req.headers.authorization
    if (typeof auth === 'undefineed') {
      res.sendStatus(403)
    } else {
      const token = auth.split(' ')[1]
      const payload = jwt.verify(token, process.env.JWT_SECRET)
      req.user_id = payload._id
    }
    next()
  } catch (e) {
    console.log(e) //REMOVE FOR PROD
    res.status(401).send({ Error: 'Unable to authenticate' })
  }
}

module.exports = auth