const { drawController, startController, clearController } = require("../controller/draw.controller");
const { messageController } = require("../controller/message.controller");
const ChatMsg = require("../model/chatModel");
const Draw = require("../model/drawModel");


const messages_ = [];
const handleSocketConnection = async (socket,io) => {
    console.log("A user connected:", socket.id);

    try {
    const previousStrokes = await Draw.find().sort({ createdAt: 1 });
    previousStrokes.forEach(stroke => {
      socket.emit(stroke.event, stroke.data);
    });
  } catch (err) {
    console.error("Error fetching strokes:", err);
  }
   try {
    const previousMSG = await ChatMsg.find().sort({ createdAt: 1 });
    previousMSG.forEach(msg => {
      socket.emit(msg.event, msg.data);
    });
  } catch (err) {
    console.error("Error fetching strokes:", err);
  }

  messages_.forEach((msg) => socket.emit(msg.event, msg.message));

  socket.on("draw", (data) => {
    drawController(socket,io,data)
  });
  socket.on("start", (data) => {
    startController(socket,io,data)
  });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
  socket.on("clear", () => {
    clearController(socket,io)
  });

  socket.on("chat-message", (msg) => {
    messageController(socket,io,msg)
  });
}

module.exports = handleSocketConnection;