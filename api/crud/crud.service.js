const logger = require('../../services/logger.service')
const dbService = require('../../services/db.service')
const { ObjectId } = require('mongodb')
module.exports = {
  query,
}

async function query(queryParams) {
  const { collectionName, aggregationPipeline = [] } = queryParams
  try {
    const criteria = _buildCriteria(queryParams)
    const collection = await dbService.getCollection(collectionName)
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