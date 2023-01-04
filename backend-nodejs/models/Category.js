const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true },
  description: String,
  promotionPosition: { type: Array, required: true },
  imageUrl: { type: String, required: false },
  sortOrder: { type: Number, required: true },
});
const Category = model("Category", categorySchema);

module.exports = Category;
