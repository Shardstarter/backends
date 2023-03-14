const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TokenLock_ETHSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    amounts: {
      type:Array
    },  
    amount:{
      type: String
    },
    name: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    decimals: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = TokenLock_ETH = mongoose.model("token_lock_eth", TokenLock_ETHSchema);
