const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mschema = new Schema(
	{
		wallet_address: {
			type: String,
		},
		email: {
			type: String,
		},
		nonevm: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = Test = mongoose.model(
	'user_info',
	mschema
);
