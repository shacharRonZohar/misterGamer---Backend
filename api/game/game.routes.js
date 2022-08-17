const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getGames, addGame } = require('./game.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getGames)
router.post('/', log, addGame)
// router.delete('/:id',  requireAuth, deleteGame)

module.exports = router