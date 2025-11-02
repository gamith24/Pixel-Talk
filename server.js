const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
let strokes = [];
const messages_ = [];
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // 👈 sab origins allow
    methods: ["GET", "POST"],
  },
});
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static("public"));
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  strokes.forEach((stroke) => socket.emit(stroke.event, stroke.data));
  messages_.forEach((msg) => socket.emit(msg.event, msg.message));
  socket.on("draw", (data) => {
    strokes.push({ event: "draw", data });
    socket.broadcast.emit("draw", data);
  });
  socket.on("start", (data) => {
    strokes.push({ event: "start", data });
    socket.broadcast.emit("start", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
  socket.on("clear", () => {
    strokes = [];
    socket.broadcast.emit("cleared", true);
  });
  socket.on("chat-message", (msg) => {
    messages_.push({ event: "chat-message", message: msg });
    socket.broadcast.emit("chat-message", msg);
  });
});

server.listen(3000, () => {
  console.log(`server running on http://192.168.10.69:${3000}`);
});
