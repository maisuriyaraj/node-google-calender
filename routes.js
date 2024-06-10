const express = require('express');
const { getCalenderEvents } = require('./controller/calenderController');

const userRoute = express.Router();

userRoute.get('/',getCalenderEvents);

module.exports = userRoute;