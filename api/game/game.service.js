const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const fs = require('fs/promises')
const path = require('path')
const { exec } = require('child_process')
// const ObjectId = require('mongodb').ObjectId
// const asyncLocalStorage = require('../../services/als.service')
async function query(filterBy = {}) {
  try {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('game')
    const games = await collection.find(criteria).toArray()
    return games
  } catch (err) {
    logger.error('cannot find games', err)
    throw err
  }
}

async function add(game) {
  try {
    game.createdAt = Date.now()
    game.updatedAt = Date.now()
    const collection = await dbService.getCollection('game')
    const newGame = await collection.insertOne(game)
    const dirPath = path.resolve('games', newGame.ops[0]._id.toString())
    fs.mkdir(dirPath)
    // exec(`git clone https://github.com/shacharRonZohar/Contact-Manager.git ${dirPath}`)
    // exec('git checkout gh-pages', { cwd: dirPath })
    // fs.mkdir(path), (err) => {
    //   if (err) logger.error('Failed making the directory with error:', err)
    //   console.log('Directory created successfully!')
    //   exec('git clone https://github.com/shacharRonZohar/Contact-Manager.git', {})
    // })
    return newGame.ops[0]
  } catch (err) {
    logger.error('cannot add game', err)
    throw err
  }
}
// async function remove(gameId) {
//     try {
//         const store = asyncLocalStorage.getStore()
//         const { loggedinUser } = store
//         const collection = await dbService.getCollection('game')
//         // remove only if user is owner/admin
//         const criteria = { _id: ObjectId(gameId) }
//         if (!loggedinUser.isAdmin) criteria.byUserId = ObjectId(loggedinUser._id)
//         const {deletedCount} = await collection.deleteOne(criteria)
//         return deletedCount
//     } catch (err) {
//         logger.error(`cannot remove game ${gameId}`, err)
//         throw err
//     }
// }


// async function add(game) {
//     try {
//         const gameToAdd = {
//             byUserId: ObjectId(game.byUserId),
//             aboutUserId: ObjectId(game.aboutUserId),
//             txt: game.txt
//         }
//         const collection = await dbService.getCollection('game')
//         await collection.insertOne(gameToAdd)
//         return gameToAdd
//     } catch (err) {
//         logger.error('cannot insert game', err)
//         throw err
//     }
// }

function _buildCriteria(filterBy) {
  const criteria = {}
  return criteria
}

module.exports = {
  query,
  // remove,
  add
}


