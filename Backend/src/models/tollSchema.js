const mongoose = require('mongoose');

const TollRateSchema = new mongoose.Schema({
  entryPoint:  String,
  exitPoint: String,
  tollRate: Number,
  numberPlate: String,
  day: String,
  specialDiscount: Number
});

mongoose.model('Toll', tollSchema);