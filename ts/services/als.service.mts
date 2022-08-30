import { AsyncLocalStorage } from 'async_hooks'
const asyncLocalStorage = new AsyncLocalStorage()

// The AsyncLocalStorage singleton
module.exports = asyncLocalStorage
