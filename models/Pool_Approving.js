const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BigNumberSchema = require('mongoose-bignumber')

// Create Schema
const MSchema = new Schema(
    {
        pool_address: { type: String, required: true, },
        user_address: { type: String, required: true, },

    },
    { timestamps: true, }
);

module.exports = Pool_BSC = mongoose.model("pool_approving", MSchema);
