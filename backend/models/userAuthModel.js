const mongoose = require("mongoose");

const userAuthSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "pls add a name"],
    },
    email: {
      type: String,
      requiered: [true, "pls add a email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "pls add a password"],
    },
    phone: {
      type: Number,
      required: [true, "pls add a phone number"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("userAuth", userAuthSchema);
