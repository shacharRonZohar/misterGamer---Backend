const express = require('express')
// const {login, signup, logout} = require('./auth.controller')
const { query, getById, add, update, remove } = require('./crud.controller')
const router = express.Router()

router.get('/', query)
// router.get('/:id', getById)
router.post('/', add)
router.put('/:_id', update)
router.delete('/:id', remove)

module.exports = router