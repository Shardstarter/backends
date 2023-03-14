const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calender_Event = new Schema(
	{
		calenderDate: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},

		description: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = Calender_Event = mongoose.model(
	'CalendarEvent',
	calender_Event
);
