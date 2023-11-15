'use strict';
const express = require("express");
const routes = express.Router();

const iot = require('../controllers/');

routes.get('/average',iot.getAverage);
routes.get('/average/hour', iot.getAverage);
routes.get('/average/day', iot.getAverageDay);
routes.get('/average/month', iot.getAverageMonth);
module.exports = routes;