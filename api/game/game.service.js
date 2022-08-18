const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
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
    // console.log(game)
    game.createdAt = Date.now()
    game.updatedAt = Date.now()
    const collection = await dbService.getCollection('game')
    const newGame = await collection.insertOne(game)
    const dirPath = path.resolve('games', newGame.ops[0]._id.toString())
    await fs.promises.mkdir(dirPath)
    game.data.forEach(async ({ name, data, path: filePath }) => {
      filePath = filePath.replace(/dist/, '')
      const fileDirPath = path.resolve(dirPath, filePath.slice(filePath.indexOf('/') + 1, filePath.lastIndexOf('/')))
      const isDirExists = fs.existsSync(fileDirPath)
      if (!isDirExists) await fs.promises.mkdir(fileDirPath)
      fs.promises.writeFile(path.resolve(fileDirPath, name), data)
    })
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


