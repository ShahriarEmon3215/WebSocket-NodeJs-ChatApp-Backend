const { Socket } = require('engine.io')
const express = require('express')

const app = express()
const PORT = process.env.PORT || 2023

const server = app.listen(PORT, () => (
  console.log("Server is running at ", PORT)
))

const io = require('socket.io')(server)

io.on('connection', (socket) => {
  console.log("Connected Socket.IO ", socket.id)
  socket.on('disconnect', () => {
    console.log("Disconnected Socket.IO ")
  })

  socket.on("message", (data) => {
    console.log(data);
    io.emit("broadcast", data);
  });
})
