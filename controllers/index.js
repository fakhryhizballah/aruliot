'use strict';
const { sensors, sequelize } = require('../models');
const { Op } = require("sequelize");
const moment = require('moment-timezone');
const timeZone = moment.tz.guess();
console.log('Zona Waktu:', timeZone);
module.exports = {
    getAverage: async (req, res) => {
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
            // rata rata value1 value2 value3 value4 value5 per jam
            let value1 = 0;
            let value2 = 0;
            let value3 = 0;
            let value4 = 0;
            let value5 = 0;
            let count = 0;
            let hour;
            let average = [];
            for (let i = 0; i < data.length; i++) {
                let jam = data[i].created_at.slice(11, 13);
                console.log(jam);
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
                    console.log(hour);
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
                // let jam = average[i].name;
                // if (jam < 10) {
                //     jam = '0' + jam + ':00';
                // } else {
                //     jam = '' + jam + ':00';
                // }
                // average[i].name = jam;

            }
            return res.status(200).json({
                status: true,
                message: 'Success',
                data: average,
                // raw: data
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
    getAverageDay: async (req, res) => {
        try {
            let data = await sensors.findAll({
                where: {
                    updated_at: {
                        [Op.between]: [req.query.start, req.query.end]
                    }
                },
                order: [
                    ['created_at', 'ASC'],
                ],
            });

            // buat rata rata per hari
            let value1 = 0;
            let value2 = 0;
            let value3 = 0;
            let value4 = 0;
            let value5 = 0;
            let count = 0;
            let day = -1;
            let tanggal = '';
            let id = 0;
            let average = [];
            for (let i = 0; i < data.length; i++) {
                let newDate = data[i].created_at;
                newDate.setHours(newDate.getHours() + 14);
                data[i].created_at = newDate;
                data[i].updated_at = newDate;
                if (day == data[i].created_at.getDate()) {
                    value1 += data[i].value1;
                    value2 += data[i].value2;
                    value3 += data[i].value3;
                    value4 += data[i].value4;
                    value5 += data[i].value5;
                    count++;
                } else {

                    day = data[i].created_at.getDate();
                    value1 = data[i].value1;
                    value2 = data[i].value2;
                    value3 = data[i].value3;
                    value4 = data[i].value4;
                    value5 = data[i].value5;
                    count = 1;
                    // get yyyy-mm-dd from data[i].created_at + 14 hours
                    tanggal = data[i].created_at.toISOString().split('T')[0];
                
                    console.log(tanggal);
                    
                    average.push({
                        name: tanggal,
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
                let day = average[i].name;
                if (day < 10) {
                    day = '0' + day;
                } else {
                    day = '' + day;
                }
                average[i].name = day;

            }
            return res.status(200).json({
                status: true,
                message: 'Success',
                data: average,
                // raw: data
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
                console.log(day);
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
}