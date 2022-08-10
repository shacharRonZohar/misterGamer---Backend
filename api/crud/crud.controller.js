const crudService = require('./crud.service')
const logger = require('../../services/logger.service')
module.exports = {
  query
}

async function query(req, res) {
  try {
    const data = await crudService.query(req.query)
    console.log(data)
    res.send(data)
  } catch (err) {
    logger.error('Cannot get data', err)
    res.status(500).send({ err: 'Failed to get data' })
  }
}