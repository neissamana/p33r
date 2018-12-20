const express = require('express')
const handleSocket = require('./server/socket.js')
const path = require('path')

const BASE_URL = ''
const SOCKET_URL = `${BASE_URL}/ws`

const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server, { path: SOCKET_URL })

app.locals.baseUrl = BASE_URL

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, './views'))

const router = express.Router()
router.use('/static', express.static(path.join(__dirname, './static')))
router.use('/call', require('./server/routes/call.js'))
router.use('/', require('./server/routes/index.js'))
app.use(BASE_URL, router)

io.on('connection', socket => handleSocket(socket, io))

let port = process.env.PORT || 3000;

server.listen(port, () => console.log('Listening on: %s', port))
