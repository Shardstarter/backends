const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mschema = new Schema(
	{
		img: {
			type: String,
		},
		title: {
			type: String,
		},
		description: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = Test = mongoose.model(
	'card',
	mschema
);
