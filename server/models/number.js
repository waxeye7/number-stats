const mongoose = require("mongoose");

const numberSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const NumberModel = mongoose.model("Number", numberSchema);

module.exports = NumberModel;
