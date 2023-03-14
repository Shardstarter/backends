const calenderRouter = require('express').Router();
const calender_Event = require('../models/CalenderEventsModal');
const moment = require('moment');

calenderRouter.post('/save-event', async (req, res) => {
	try {
		const { calenderDate, image, description } = req.body;
		console.log(req.body);
		// console.log(
		// 	'calenderDate:',
		// 	calenderDate,
		// 	'images:',
		// 	image,
		// 	'description:',
		// 	description
		// );

		if ((!calenderDate && !image) || !description) {
			throw new Error('image and description are required');
		}

		const calenderAdded = calender_Event(req.body);
		await calenderAdded.save();
		res.status(201).json({ success: true });
	} catch (error) {
		res.status(400).send({ status: false, message: error.message });
		console.log(error.message);
	}
});

calenderRouter.get('/get-events', async (req, res) => {
	try {
		const eventData = await calender_Event.find({
			// start: { $gte: moment(req.query.start).toDate() },
			// end: { $lte: moment(req.query.end).toDate() },
		});
		// res.send(eventData);
		res.status(200).send({ status: true, data: eventData });
	} catch (error) {
		res.status(400).send({ status: false, message: error.message });
		console.log(error);
	}
});

module.exports = calenderRouter;
