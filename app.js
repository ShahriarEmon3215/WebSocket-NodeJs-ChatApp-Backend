const express = require("express");
const router = require("express").Router();
const socket = require("socket.io");
var bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 2023;

app.use(bodyParser.json());
// const server = app.listen(PORT, () =>
//   console.log("Server is running at ", PORT)
// );

// const io = socket(server);

// const rooms = [1, 2, 3];
// io.on("connection", (socket) => {
//   console.log("Connected Socket.IO ", socket.id);
//   /// join room
//   socket.join(rooms[0]);

//   /// message event
//   socket.on("message", (data) => {
//     /// emit message to "room1" and event "breadcast"
//     io.to(rooms[0]).emit("broadcast", data);
//   });

//   /// disconnect socket
//   socket.on("disconnect", () => {
//     console.log("Disconnected Socket.IO ");
//   });
// });

var Pusher = require("pusher");

var pusher = new Pusher({
  appId: "1730116",
  key: "a8c22b14a31ad1b20bb1",
  secret: "01db3f5c64280d3bfe14",
  cluster: "ap1",
});

pusher.trigger("chat-channel", "message-event", { message: "hello world" });

router.post("/message", (req, res) => {
  var body = req.body;

  pusher.trigger("chat-channel", "message-event", {
    user: body.user,
    text: body.text,
    time: body.time,
  });
  res.status(200).json({ message: "Message sent" });
});


app.use("/api", router);

app.listen(PORT, () => console.log("Server is running at ", PORT));
