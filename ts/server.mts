// TODO: Check ALL imports still work after finishing conversion to TS
import express from 'express'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import { createServer } from 'http'

const app = express()
const httpServer = createServer(app)

// Express App Config
app.use(cookieParser())
app.use(express.json({ limit: '50mb' }))
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  const corsOptions = {
    origin: ['http://127.0.0.1:5173', 'http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true
  }
  app.use(cors(corsOptions))
}

// routes
// TODO: Check best practice, usually we import everything at the top of the file to stay organized, 
// but here we used require in the middle of the file so I copied it for now, same for further down the file.
import { gameRoutes } from './api/game/game.routes'
import { crudRoutes } from './api/crud/crud.routes'
import { setupSocketAPI } from './services/socket.service'

app.use('/api/crud', crudRoutes)
app.use('/api/game', gameRoutes)
setupSocketAPI(httpServer)

// This route takes care of the requests made by the iFrame, 
// supplying it with the initial game html and sticking a cookie so we can recognize further requests
app.get('/play/:gameId', ({ params: { gameId } }, res) => {
  res.cookie('gameId', gameId, { secure: true })
  // An example of the resulting file path
  // 'C:/dev/coding-academy/projs/misterGamer/Backend/games/62fd4a82e7523cf8b9fc6c0f/index.html'
  res.sendFile(path.join(__dirname, 'games', `${gameId}`, 'index.html'))
})

app.get('/assets/:fileName', (req, res) => {
  const { gameId } = req.cookies
  const { fileName } = req.params
  res.sendFile(path.join(__dirname, 'games', `${gameId}`, 'assets', fileName))
})

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

import { logger } from './services/logger.service'
// const logger = require('./services/logger.service')
const port = process.env.PORT || 3031
httpServer.listen(port, () => {
  logger.info('Server is running on port: ' + port)
})