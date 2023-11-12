'use strict';
const express = require("express");
const routes = express.Router();

const iot = require('../controllers/');

routes.get('/average',iot.getAverage);
routes.get('/average/hour', iot.getAverage);
routes.get('/average/day', iot.getAverageDay);
module.exports = routes;