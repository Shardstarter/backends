const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mschema = new Schema(
	{
		staking_address: {
			type: String,
		},
		wallet_address: {
			type: String,
		},
		staked_amount: {
			type: Number,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = Test = mongoose.model(
	'user_staking',
	mschema
);
