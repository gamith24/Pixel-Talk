const ChatMsg = require("../model/chatModel");

const messageController = async(socket,io,msg,messages_) => {
    try {
    ChatMsg.create({event : "chat-message", message : msg})
    socket.broadcast.emit("chat-message", msg);
    } catch (error) {
       console.log(error) 
    }
}

module.exports = {messageController}