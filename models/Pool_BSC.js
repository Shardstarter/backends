const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BigNumberSchema = require('mongoose-bignumber')

// Create Schema
const Pool_BSCSchema = new Schema(
    {
        address: {
            type: String,
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
        fcfsStartDateTime: {
            type: Date,
        },
        fcfsEndDateTime: {
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
        whitelistMaxDeposit: {
            type: Number
        },
        participantsAddresses: {
            type: Array,
        },
        alarms: {
            type: Array
        },
        logo: {
            type: String
        },
        poster: { type: String },
        projectName: { type: String },
        deal: { type: String },
        category: { type: String },
        blockchain: { type: String },
        tgi: { type: String },
        type: { type: String },

        ipfs: {
            logo: {
                type: String
            },
            website: {
                type: String
            },
            twitter: {
                type: String
            },
            github: {
                type: String
            },
            telegram: {
                type: String
            },
            discord: {
                type: String
            },
            description: {
                type: String
            }
        },
        holders: {
            type: Object
        },
        teamVesting_amount: {
            type: Number
        },
        teamVesting_unlocked_amount: {
            type: Number
        },
        teamVesting_first_percent: {
            type: Number
        },
        teamVesting_first_period: {
            type: Number
        },
        teamVesting_each_percent: {
            type: Number
        },
        teamVesting_each_period: {
            type: Number
        },
        description: {
            type: String,
            required: false,
        },
        roadmap_description: {
            type: String,
            required: false,
        },
        roadmap_url: {
            type: String,
            required: false,
        },
        about_description: {
            type: String,
            required: false,
        },
        about_url: {
            type: String,
            required: false,
        },
        features_description: {
            type: String,
            required: false,
        },
        features_url: {
            type: String,
            required: false,
        },
        teams_description: {
            type: String,
            required: false,
        },
        teams_url: {
            type: String,
            required: false,
        },
        tokenomics_description: {
            type: String,
            required: false,
        },
        tokenomics_url: {
            type: String,
            required: false,
        },
        twitter_followers: {
            type: Number,
            required: false
        }
    },
    {
        timestamps: true,
    }
);

module.exports = Pool_BSC = mongoose.model("pool_bsc", Pool_BSCSchema);
