const Draw = require("../model/drawModel");


const drawController = async (socket,io,data) => {
    try {
       await Draw.create({event: "draw", data})
       await socket.broadcast.emit("draw", data);
    } catch (error) {
        console.log(error)
    }
}

const startController =async (socket,io,data) => {
    try {
       await Draw.create({ event: "start", data });
       await socket.broadcast.emit("start", data);
    } catch (error) {
        console.log(error)
    }
}

const clearController = async (socket,io) => {
    try {
        await Draw.deleteMany({});
      await socket.broadcast.emit("cleared", true);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {drawController,startController,clearController}