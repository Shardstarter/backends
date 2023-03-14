const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BigNumberSchema = require('mongoose-bignumber')

// Create Schema
const Pool_ETHSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    weiRaised: {
      type: Number,
      required: true,
    },
    hardCap: {
      type: Number,
      required: true,
    },
    softCap: {
      type: Number,
      required: true,
    },
    presaleRate: {
      type: Number,
      required: true,
    },
    dexCapPercent: {
      type: Number,
      required: true,
    },
    dexRate: {
      type: Number,
      required: true,
    },
    projectTokenAddress: {
      type: String,
      required: true,
    },
    tier: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    kyc: {
      type: Boolean
    },
    audit: {
      type: Boolean
    },
    auditLink: {
      type: String
    },
    startDateTime: {
      type: Date,
    },
    endDateTime: {
      type: Date,
    },
    listDateTime: {
      type: Date,
    },
    minAllocationPerUser: {
      type: Number,
      required: true,
    },
    maxAllocationPerUser: {
      type: Number,
      required: true,
    },
    dexLockup: {
      type: String,
      required: true,
    },
    extraData: {
      type: String,
      required: true,
    },
    // refund: {
    //   type: Boolean
    // },
    whitelistable: {
      type: Boolean
    },
    decimals: {
      type: String,
      required: true,
    },
    poolPercentFee: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    totalSupply: {
      type: Number,
      required: true,
    },
    whiteLists: {
      type: Array,
    },
    participantsAddresses: {
      type: Array,
    },
    alarms:{
      type: Array
    },
    ipfs:{
      logo:{
        type:String
      },
      website:{
        type:String
      },
      twitter:{
        type:String
      },
      github:{
        type:String
      },
      telegram:{
        type:String
      },
      discord:{
        type:String
      },
      description:{
        type:String
      }
    },
    holders:{
      type:Object
    },
    teamVesting_amount:{
      type:Number
    },
    teamVesting_unlocked_amount:{
      type:Number
    },
    teamVesting_first_percent:{
      type:Number
    },
    teamVesting_first_period:{
      type:Number
    },
    teamVesting_each_percent:{
      type:Number
    },
    teamVesting_each_period:{
      type:Number
    }
  },
  {
    timestamps: true,
  }
);

module.exports = Pool_ETH = mongoose.model("pool_eth", Pool_ETHSchema);
