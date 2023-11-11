'use strict';
const express = require("express");
const routes = express.Router();

const iot = require('../controllers/');

routes.get('/average',iot.getAverage);
module.exports = routes;