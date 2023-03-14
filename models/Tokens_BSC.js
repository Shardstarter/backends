const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const Tokens_BSCSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = Tokens_BSC = mongoose.model("tokens_bsc", Tokens_BSCSchema);
