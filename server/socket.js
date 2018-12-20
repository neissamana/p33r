'use strict'
const _ = require('underscore')

const messages = {}

module.exports = function (socket, io) {
  socket.on('signal', payload => {
    io.to(payload.userId).emit('signal', {
      userId: socket.id,
      signal: payload.signal
    })
  })

  socket.on('new_message', payload => {
    addMesssage(socket.room, payload)
    io.to(socket.room).emit('new_message', payload)
  })

  socket.on('ready', roomName => {
    if (socket.room) socket.leave(socket.room)
    socket.room = roomName
    socket.join(roomName)
    socket.room = roomName

    let users = getUsers(roomName)
    let messages = getMesssages(roomName)

    io.to(roomName).emit('users', {
      initiator: socket.id,
      users
    })

    io.to(roomName).emit('messages', messages)
  })

  function getUsers (roomName) {
    return _.map(io.sockets.adapter.rooms[roomName].sockets, (_, id) => {
      return { id }
    })
  }

  function getMesssages (roomName) {
    if (_.isUndefined(messages[roomName])) {
      messages[roomName] = []
    }
    return messages[roomName]
  }

  function addMesssage (roomName, payload) {
    getMesssages(roomName).push(payload)
  }
}

