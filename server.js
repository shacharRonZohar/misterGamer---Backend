const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const axios = require('axios')
const app = express()
const http = require('http').createServer(app)

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

// const authRoutes = require('./api/auth/auth.routes')
// const userRoutes = require('./api/user/user.routes')
// const reviewRoutes = require('./api/review/review.routes')
const gameRoutes = require('./api/game/game.routes')
const crudRoutes = require('./api/crud/crud.routes')
const { setupSocketAPI } = require('./services/socket.service')

// routes
// const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
// app.all('*', setupAsyncLocalStorage)

// app.use('/api/auth', authRoutes)
// app.use('/api/user', userRoutes)
// app.use('/api/review', reviewRoutes)
app.use('/api/crud', crudRoutes)
app.use('/api/game', gameRoutes)
setupSocketAPI(http)

app.get('/play/:gameId', (req, res) => {
  const { gameId } = req.params
  res.cookie('gameId', gameId, { sameSite: 'None', secure: true })
  res.sendFile(path.join(__dirname, 'games', `${gameId}`, 'index.html'))
  './games/62fd4a82e7523cf8b9fc6c0f/index.html'
})

app.get('/assets/:fileName', (req, res) => {
  const { gameId } = req.cookies
  const { fileName } = req.params
  res.sendFile(path.resolve(__dirname, 'games', `${gameId}`, 'assets', fileName))
})

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const logger = require('./services/logger.service')
const port = process.env.PORT || 3031
http.listen(port, () => {
  logger.info('Server is running on port: ' + port)
})