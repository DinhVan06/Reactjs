const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const sliderSchema = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: false },
  url: { type: String, required: false },
  imageUrl: { type: String, required: true },
  sortOrder: { type: Number, required: true },
  active: { type: Boolean, required: true },
});

const Slider = model("Slider", sliderSchema);

module.exports = Slider;
