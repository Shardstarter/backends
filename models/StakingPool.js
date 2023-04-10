const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BigNumberSchema = require("mongoose-bignumber");

// Create Schema
const DBSchema = new Schema(
  {
    address: {
      type: String,
    },
    owner: {
      type: String,
    },
    tokenAddress: {
      type: String,
    },
    tokenName: {
      type: String,
    },
    tokenSymbol: {
      type: String,
    },
    logo: {
      type: String,
    },
    lockingdays: {
      type: Number,
    },
    rewardRate: {
      type: Number,
    },
    tvl: {
      type: Number,
    },
    startAt: {
      type: Date,
    },
    // whitelistable: {
    //   type: Boolean,
    // },
    // participantsAddresses: {
    //   type: Array,
    // },
    // ipfs: {
    //   logo: {
    //     type: String,
    //   },
    //   website: {
    //     type: String,
    //   },
    //   twitter: {
    //     type: String,
    //   },
    //   github: {
    //     type: String,
    //   },
    //   telegram: {
    //     type: String,
    //   },
    //   discord: {
    //     type: String,
    //   },
    //   description: {
    //     type: String,
    //   },
    // },
    // holders: {
    //   type: Object,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = StakingPool = mongoose.model("staking_pool", DBSchema);
