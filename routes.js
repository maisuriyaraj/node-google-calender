const express = require('express');
const { getCalenderEvents, addEventsToCalender } = require('./controller/calenderController');

const userRoute = express.Router();

userRoute.get('/events',getCalenderEvents);
userRoute.post('/createEvent',addEventsToCalender);

module.exports = userRoute;