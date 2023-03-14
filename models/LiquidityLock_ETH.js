const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LiquidityLock_ETHSchema = new Schema(
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
    token0_name: {
      type: String,
      required: true,
    },
    token1_name: {
      type: String,
      required: true,
    },
    token0_symbol: {
      type: String,
      required: true,
    },
    token1_symbol: {
      type: String,
      required: true,
    },
    dex: {
      type: String,
      required: true,
    },    
    token0: {
      type: String,
      required: true,
    },
    token1: {
      type: String,
      required: true,
    }  
  },
  {
    timestamps: true,
  }
);

module.exports = LiquidityLock_ETH = mongoose.model("liquidity_lock_eth", LiquidityLock_ETHSchema);
