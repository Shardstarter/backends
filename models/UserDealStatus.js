const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mschema = new Schema(
	{
		pool_address: {
			type: String,
		},
		wallet_address: {
			type: String,
		},
		deposit_amount: {
			type: Number,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = Test = mongoose.model(
	'user_deal_status',
	mschema
);
