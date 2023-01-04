const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const featureSchema = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: false },
  url: { type: String, required: false },
  imageUrl: { type: String, required: true },
  sortOrder: { type: Number, required: true },
  active: { type: Boolean, required: true },
  createDate: { type: Date, required: true, default: new Date() },
  createBy: { type: Schema.Types.ObjectId, ref: "employee", required: true },
  updateDate: { type: Date, required: true },
  updateBy: { type: Schema.Types.ObjectId, ref: "employee", required: true },
  isDelete: { type: Boolean, required: true },
});

const Feature = model("feature", featureSchema);
module.exports = Feature;
