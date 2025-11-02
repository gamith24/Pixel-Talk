const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv").config();;

const handleSocketConnection = require("./socket/socket");
const mongoose = require("./config/db");
const cors = require("cors");

const POST = process.env.PORT || 3000;
const app = express();


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Connected to MongoDB")).catch((err) => console.error("❌ MongoDB connection error:", err));
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

io.on("connection", async socket => await (handleSocketConnection(socket,io)));

server.listen(3000, () => {
  console.log(`server running on http//localhost:${3000}`);
});
