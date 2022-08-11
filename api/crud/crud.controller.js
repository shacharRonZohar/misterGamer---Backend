const crudService = require('./crud.service')
const logger = require('../../services/logger.service')
module.exports = {
  query,
  add,
  update,
  remove
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

async function add(req, res) {
  try {
    const data = await crudService.add(req.body)
    res.send(data)
  } catch (err) {
    logger.error('Cannot add data', err)
    res.status(500).send({ err: 'Failed to add data' })
  }
}

async function update({ params: { _id }, body }, res) {
  try {
    const data = await crudService.update(_id, body)
    res.send(data)
  } catch (err) {
    logger.error('Cannot update data', err)
    res.status(500).send({ err: 'Failed to update data' })
  }
}

async function remove({ params: { _id } }, res) {
  try {
    const data = await crudService.remove(_id)
    res.send(data)
  } catch (err) {
    logger.error('Cannot remove data', err)
    res.status(500).send({ err: 'Failed to remove data' })
  }
}