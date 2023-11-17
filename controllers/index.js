'use strict';
const { sensors } = require('../models');
const { Op } = require("sequelize");
const moment = require('moment');
module.exports = {
    getAverage: async (req, res) => {
        try {
            let { start } = req.query
            let data = await sensors.findAll({
                attributes: [
                    "id",
                    "value1",
                    "value2",
                    "value3",
                    "value4",
                    "value5",
                    "created_at"
                ],
                where: {
                    created_at: { [Op.startsWith]: start }
                },
                order: [
                    ['created_at', 'ASC'],
                ],
            });
            // rata rata value1 value2 value3 value4 value5 per jam
            let value1 = 0;
            let value2 = 0;
            let value3 = 0;
            let value4 = 0;
            let value5 = 0;
            let count = 0;
            let hour = "";
            let average = [];
            for (let i = 0; i < data.length; i++) {
                let jam = data[i].created_at.slice(11, 14);
                // Tanggal dan waktu yang diberikan
                if (hour == jam) {
                    value1 += data[i].value1;
                    value2 += data[i].value2;
                    value3 += data[i].value3;
                    value4 += data[i].value4;
                    value5 += data[i].value5;
                    count++;
                } else {
                    hour = jam;
                    value1 = data[i].value1;
                    value2 = data[i].value2;
                    value3 = data[i].value3;
                    value4 = data[i].value4;
                    value5 = data[i].value5;
                    count = 1;
                    average.push({
                        name: hour + ":00",
                        value1: (value1 / count).toFixed(2),
                        value2: (value2 / count).toFixed(2),
                        value3: (value3 / count).toFixed(2),
                        value4: (value4 / count).toFixed(2),
                        value5: (value5 / count).toFixed(2),
                    });
                }

            }
            for (let i = 0; i < average.length; i++) {
                //   convert name to string hh:mm 
                average[i].id = i + 1;
            }
            return res.status(200).json({
                status: true,
                message: 'Success',
                data: average
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
                data: error
            });
        }
    },
    getAverageWeek: async (req, res) => {
        try {
            let { start } = req.query
            // let start week
            let data = await sensors.findAll({
                attributes: [
                    "id",
                    "value1",
                    "value2",
                    "value3",
                    "value4",
                    "value5",
                    "created_at"
                ],
                where: {
                    created_at: {
                        [Op.gte]: (start + '-01'), // > 2021-05-01 00:00:00
                        [Op.lt]: (start + '-30'), // < 2021-05-08 00:00:00
                    }
                },
                order: [
                    ['created_at', 'ASC'],
                ],
            });
            let value1 = 0;
            let value2 = 0;
            let value3 = 0;
            let value4 = 0;
            let value5 = 0;
            let count = 0;
            let average = [];
            let week = 0;
            for (let i = 0; i < data.length; i++) {
                let tanggalMoment = moment(data[i].created_at, 'DD/MM/YYYY HH:mm:ss');
                const minggu = tanggalMoment.week();
                if (week == minggu) {
                    value1 += data[i].value1;
                    value2 += data[i].value2;
                    value3 += data[i].value3;
                    value4 += data[i].value4;
                    value5 += data[i].value5;
                    count++;
                } else {
                    value1 = data[i].value1;
                    value2 = data[i].value2;
                    value3 = data[i].value3;
                    value4 = data[i].value4;
                    value5 = data[i].value5;
                    week = minggu;
                    count = 1;
                    average.push({
                        name: minggu,
                        value1: (value1 / count).toFixed(2),
                        value2: (value2 / count).toFixed(2),
                        value3: (value3 / count).toFixed(2),
                        value4: (value4 / count).toFixed(2),
                        value5: (value5 / count).toFixed(2),
                    });
                }
            }
            for (let i = 0; i < average.length; i++) {
                //   convert name to string hh:mm
                average[i].id = i + 1;
                average[i].name = 1 + i + " Minggu";
            }
            return res.status(200).json({
                status: true,
                message: 'Success',
                data: average,

            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
                data: error
            });
        }
    },

    getAverageMonth: async (req, res) => {
        try {
            let { start } = req.query
            // let start month
            let data = await sensors.findAll({
                attributes: [
                    "id",
                    "value1",
                    "value2",
                    "value3",
                    "value4",
                    "value5",
                    "created_at"
                ],
                where: {
                    created_at: {
                        [Op.gte]: (start + '-01'), // > 2021-05-01 00:00:00
                        [Op.lt]: (start + '-30'), // < 2021-05-02 00:00:00
                    }
                },
                order: [
                    ['created_at', 'ASC'],
                ],
            });
            let value1 = 0;
            let value2 = 0;
            let value3 = 0;
            let value4 = 0;
            let value5 = 0;
            let count = 0;
            let day;
            let average = [];
            for (let i = 0; i < data.length; i++) {
                let daynow = data[i].created_at.slice(0, 2);
                if (day == daynow) {
                    value1 += data[i].value1;
                    value2 += data[i].value2;
                    value3 += data[i].value3;
                    value4 += data[i].value4;
                    value5 += data[i].value5;
                    count++;
                } else {

                    day = daynow;
                    value1 = data[i].value1;
                    value2 = data[i].value2;
                    value3 = data[i].value3;
                    value4 = data[i].value4;
                    value5 = data[i].value5;
                    count = 1;
                    average.push({
                        id: i + 1,
                        name: data[i].created_at.slice(0, 5),
                        value1: (value1 / count).toFixed(2),
                        value2: (value2 / count).toFixed(2),
                        value3: (value3 / count).toFixed(2),
                        value4: (value4 / count).toFixed(2),
                        value5: (value5 / count).toFixed(2),
                    });
                }
            }
            for (let i = 0; i < average.length; i++) {
                average[i].id = i + 1;
            }
            return res.status(200).json({
                status: true,
                message: 'Success',
                data: average,

            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
                data: error
            });
        }
    },
    getAverageYear: async (req, res) => {
        try {
            let { start } = req.query
            // let start month
            let data = await sensors.findAll({
                attributes: [
                    "id",
                    "value1",
                    "value2",
                    "value3",
                    "value4",
                    "value5",
                    "created_at"
                ],
                where: {
                    created_at: { [Op.startsWith]: start }
                },
                order: [
                    ['created_at', 'ASC'],
                ],
            });
            let value1 = 0;
            let value2 = 0;
            let value3 = 0;
            let value4 = 0;
            let value5 = 0;
            let count = 0;
            let month;
            let average = [];
            for (let i = 0; i < data.length; i++) {
                let monthnow = data[i].created_at.slice(3, 5);
                if (month == monthnow) {
                    value1 += data[i].value1;
                    value2 += data[i].value2;
                    value3 += data[i].value3;
                    value4 += data[i].value4;
                    value5 += data[i].value5;
                    count++;
                } else {

                    month = monthnow;
                    value1 = data[i].value1;
                    value2 = data[i].value2;
                    value3 = data[i].value3;
                    value4 = data[i].value4;
                    value5 = data[i].value5;
                    count = 1;
                    average.push({
                        id: i + 1,
                        name: data[i].created_at.slice(3, 10),
                        value1: (value1 / count).toFixed(2),
                        value2: (value2 / count).toFixed(2),
                        value3: (value3 / count).toFixed(2),
                        value4: (value4 / count).toFixed(2),
                        value5: (value5 / count).toFixed(2),
                    });
                }
            }
            for (let i = 0; i < average.length; i++) {
                average[i].id = i + 1;
            }
            return res.status(200).json({
                status: true,
                message: 'Success',
                data: average,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
                data: error
            });
        }
    }
}