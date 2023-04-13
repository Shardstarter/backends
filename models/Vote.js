const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mschema = new Schema(
	{
		projectName: {
			type: String,
		},
		logo: {
			type: String,
		},
		ticker: {
			type: String,
		},
		website: {
			type: String,
		},
		telegram: {
			type: String,
		},
		twitter: {
			type: String,
		},
		discord: {
			type: String,
		},
		participants: [
			{
				wallet_address: String,
				power: Number,
				isUp: Boolean,
			}
		],
		up: {
			type: Number, default: 0,
		},
		down: {
			type: Number, default: 0,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = Test = mongoose.model(
	'vote',
	mschema
);
