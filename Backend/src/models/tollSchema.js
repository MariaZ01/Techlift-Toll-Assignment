const mongoose = require('mongoose');

const tollSchema = new mongoose.Schema({
  entryPoint: String,
  exitPoint: String,
  tollRate: Number,
  numberPlate: String,
  day: String,
  distance: Number,
  cost: Number
});

mongoose.model('Toll', tollSchema);