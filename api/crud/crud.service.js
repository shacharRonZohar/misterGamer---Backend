const logger = require('../../services/logger.service')
const dbService = require('../../services/db.service')
const { ObjectId } = require('mongodb')

module.exports = {
  query,
  add,
  update,
  remove
}

async function query(queryParams) {
  const { collectionName, aggregationPipeline = [] } = queryParams
  try {
    const criteria = _buildCriteria(queryParams)
    const collection = await dbService.getCollection(collectionName)
    // TODO: Check how bad it is to always use aggregation instead of .find()
    const data = await collection.aggregate([
      {
        $match: criteria,
      },
      ...parseAggregationPipeline(aggregationPipeline),
    ]).toArray()
    return data
  } catch (err) {
    logger.error('crudService: Cannot get data', err)
    throw err
  }
}

async function add({ collectionName, entity }) {
  try {
    const collection = await dbService.getCollection(collectionName)
    const result = await collection.insertOne(entity)
    return result.ops[0]
  } catch (err) {
    logger.error('crudService: Cannot add data', err)
    throw err
  }
}


async function update(_id, { collectionName, entity }) {
  try {
    const collection = await dbService.getCollection(collectionName)
    const result = await collection.updateOne({ _id }, { $set: entity })
    return result.result.nModified === 1
  } catch (err) {
    logger.error('crudService: Cannot update data', err)
    throw err
  }
}


async function remove(_id, { collectionName }) {
  try {
    const collection = await dbService.getCollection(collectionName)
    const result = await collection.deleteOne({ _id })
    return result.result.n === 1
  } catch (err) {
    logger.error('crudService: Cannot remove data', err)
    throw err
  }
}

function _buildCriteria(queryParams) {

  // No idea if this function works
  // TODO: Test this function
  const criteria = {}
  for (const key in queryParams) {
    if (key === 'collectionName' || key === 'aggregationPipeline') continue
    // TODO: Find a better name then value
    const value = queryParams[key]
    if (key === '_id' || /Id/ig.test(key)) criteria[key] = ObjectId(value)
    else criteria[key] = value
  }
  return criteria
}

function parseAggregationPipeline(aggregationPipeline) {
  return aggregationPipeline.map(step => JSON.parse(step))
}