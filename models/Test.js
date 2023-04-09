const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mschema = new Schema(
	{
		title: {
			type: String,
		},
		content: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = Test = mongoose.model(
	'test',
	mschema
);
