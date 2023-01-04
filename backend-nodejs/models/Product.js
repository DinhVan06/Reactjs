const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    min: [0, "Must be at least 0, got {VALUE}"],
  },
  discount: { type: Number, min: 0, max: 100, required: true },
  stock: { type: Number, min: 0, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  supplierId: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
  description: { type: String, required: false },
  promotionPosition: { type: Array, required: true },
  imageUrl: { type: String, required: true },
  images: { type: Array, required: true },
});
const Product = model("product", productSchema);

module.exports = Product;
