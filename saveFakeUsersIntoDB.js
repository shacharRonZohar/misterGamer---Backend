(async () => {
  const FS = require('fs')
  const axios = require('axios')
  const dbService = require('./services/db.service')
  const bcrypt = require('bcrypt')
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
  const users = data.map(({ name, username, email }) => {
    return {
      name,
      username,
      email,
      password: 'password'
    }
  })
  FS.writeFileSync('./data/users.json', JSON.stringify(users))
  const collection = await dbService.getCollection('user')
  const saltRounds = 10
  const ecnryptedUsers = await Promise.all(users.map(async user => {
    const hash = await bcrypt.hash(user.password, saltRounds)
    user.password = hash
    return user
  }))
  await collection.insertMany(ecnryptedUsers)
})()