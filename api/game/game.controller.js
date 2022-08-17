const logger = require('../../services/logger.service')
// const userService = require('../user/user.service')
// const authService = require('../auth/auth.service')
// const socketService = require('../../services/socket.service')
const gameService = require('./game.service')

async function getGames({ query }, res) {
  try {
    const games = await gameService.query(query)
    res.send(games)
  } catch (err) {
    logger.error('Cannot get games', err)
    res.status(500).send({ err: 'Failed to get games' })
  }
}

async function addGame({ body }, res) {
  try {
    const game = await gameService.add(body)
    res.send(game)
  } catch (err) {
    logger.error('Cannot add game', err)
    res.status(500).send({ err: 'Failed to add game' })
  }
}
// async function deleteGame(req, res) {
//     try {
//         const deletedCount = await gameService.remove(req.params.id)
//         if (deletedCount === 1) {
//             res.send({ msg: 'Deleted successfully' })
//         } else {
//             res.status(400).send({ err: 'Cannot remove game' })
//         }
//     } catch (err) {
//         logger.error('Failed to delete game', err)
//         res.status(500).send({ err: 'Failed to delete game' })
//     }
// }


// async function addGame(req, res) {

//     var loggedinUser = authService.validateToken(req.cookies.loginToken)

//     try {
//         var game = req.body
//         game.byUserId = loggedinUser._id
//         game = await gameService.add(game)

//         // prepare the updated game for sending out
//         game.aboutUser = await userService.getById(game.aboutUserId)

//         // Give the user credit for adding a game
//         // var user = await userService.getById(game.byUserId)
//         // user.score += 10
//         loggedinUser.score += 10

//         loggedinUser = await userService.update(loggedinUser)
//         game.byUser = loggedinUser

//         // User info is saved also in the login-token, update it
//         const loginToken = authService.getLoginToken(loggedinUser)
//         res.cookie('loginToken', loginToken)


//         socketService.broadcast({type: 'game-added', data: game, userId: loggedinUser._id.toString()})
//         socketService.emitToUser({type: 'game-about-you', data: game, userId: game.aboutUserId})

//         const fullUser = await userService.getById(loggedinUser._id)
//         socketService.emitTo({type: 'user-updated', data: fullUser, label: fullUser._id})

//         res.send(game)

//     } catch (err) {
//         logger.error('Failed to add game', err)
//         res.status(500).send({ err: 'Failed to add game' })
//     }
// }

module.exports = {
  getGames,
  // deleteGame,
  addGame
}