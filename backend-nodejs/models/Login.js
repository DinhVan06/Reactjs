const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const loginSchema = new Schema({
  email: {
    type: String,
    validate: {
      validator: function (value) {
        const emailRegex =
          /^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;
        return emailRegex.test(value);
      },
      message: `{value} is not a valid email`,
    },
    required: [true, "email is required"],
  },
  password: { type: String, min: 5, required: true },
  lastActivity: { type: Date, required: true },
  look: { type: Boolean, required: true },
  accountType: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        if (["PUBLIC", "PRIVATE"].includes(value.toUpperCase())) {
          return true;
        }
        return false;
      },
      message: `accountType type: {VALUE} is invalid!`,
    },
  },
});
const Login = model("login", loginSchema);
module.exports = Login;
