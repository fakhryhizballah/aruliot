'use strict';
const express = require("express");
const routes = express.Router();

const iot = require('../controllers/');

routes.get('/average/hour', iot.getAverage);
routes.get('/average/week', iot.getAverageWeek);
routes.get('/average/month', iot.getAverageMonth);
routes.get('/average/year', iot.getAverageYear);
module.exports = routes;