const mongoose = require("mongoose")

const drawSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true // optional, but recommended
  },
  data: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    color: { type: String, default: 'black' }
  },createdAt: {
    type: Date,
    default: Date.now,
    expires: '24h', 
  },
});

const Draw = mongoose.model('Draw', drawSchema);
module.exports = Draw;
