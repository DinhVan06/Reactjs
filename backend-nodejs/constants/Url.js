const { default: mongoose } = require("mongoose");
export const MONGOOSE_URL = mongoose.connect(
  "mongodb://localhost:27017/Website"
);
