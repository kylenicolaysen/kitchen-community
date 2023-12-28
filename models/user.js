const bcrypt = require('bcrypt')

const createUser = async (input) => {
  const email = input.email
  console.log('input.password ', input.password)
  const password = await bcrypt.hash(input.password, 10)
  const username = input.username
  const user = { email, password, username }
  return user
}

module.exports = createUser