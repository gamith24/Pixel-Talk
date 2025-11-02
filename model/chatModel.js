const mongoose = require("mongoose");
const { type } = require("os");

const chat = new mongoose.Schema({
    event : {
        type:String,
        require:true
    },
  message: {
    type: String,
    required: true,
  },
   createdAt: {
    type: Date,
    default: Date.now,
    expires: '24h', 
  },
});

const ChatMsg = mongoose.model("ChatMsg", chat);

module.exports = ChatMsg;