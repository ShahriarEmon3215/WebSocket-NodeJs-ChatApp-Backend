const express = require("express");
const socket = require("socket.io");

const app = express();
const PORT = process.env.PORT || 2023;

const server = app.listen(PORT, () =>
  console.log("Server is running at ", PORT)
);

const io = socket(server);

const rooms = [1, 2, 3];
io.on("connection", (socket) => {
  console.log("Connected Socket.IO ", socket.id);
  /// join room
  socket.join(rooms[0]);

  /// message event
  socket.on("message", (data) => {
    /// emit message to "room1" and event "breadcast"
    io.to(rooms[0]).emit("broadcast", data);
  });

  /// disconnect socket
  socket.on("disconnect", () => {
    console.log("Disconnected Socket.IO ");
  });
});
