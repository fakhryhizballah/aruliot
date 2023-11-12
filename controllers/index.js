'use strict';
const e = require('express');
const { sensors} = require('../models');
const { Op } = require("sequelize");
const moment = require('moment-timezone');
const timeZone = moment.tz.guess();
console.log('Zona Waktu:', timeZone);
module.exports = {
    getAverage: async (req, res) => {
        try {
            let data = await sensors.findAll({
                // attributes: [
                // ],
                where: {
                    created_at: {
                        [Op.startsWith]: req.query.start
                    }
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
            let hour = -1;
            let id = 0;
            let average = [];
            for (let i = 0; i < data.length; i++) {
                if (hour == data[i].created_at.getHours()) {
                    value1 += data[i].value1;
                    value2 += data[i].value2;
                    value3 += data[i].value3;
                    value4 += data[i].value4;
                    value5 += data[i].value5;
                    count++;
                } else {

                    hour = data[i].created_at.getHours();
                    value1 = data[i].value1;
                    value2 = data[i].value2;
                    value3 = data[i].value3;
                    value4 = data[i].value4;
                    value5 = data[i].value5;
                    count = 1;
                    console.log(hour);
                    average.push({
                        name: hour,
                        value1: (value1 / count).toFixed(2),
                        value2: (value2 / count).toFixed(2),
                        value3: (value3 / count).toFixed(2),
                        value4: (value4 / count).toFixed(2),
                        value5: (value5 / count).toFixed(2),
                    });
                }

            }
            for (let i = 0; i < average.length; i++) {
                console.log(average[i]);
                //   convert name to string hh:mm 
                average[i].id = i + 1;
                let jam = average[i].name;
                if (jam < 10) {
                    jam = '0' + jam + ':00';
                } else {
                    jam = '' + jam + ':00';
                }
                average[i].name = jam;

            }
            return res.status(200).json({
                status: true,
                message: 'Success',
                data: average,
                raw: data
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
            console.log(req.query.start);
            console.log(req.query.end);
            let start = new Date(req.query.start);
            let end = new Date(req.query.end);
            console.log(start);
            console.log(moment(req.query.start).tz('Asia/Pontianak').toDate());
            console.log(moment(start).tz('Asia/Pontianak').toDate());
            let mulai = moment(start).tz('Asia/Pontianak').toDate();
            let data = await sensors.findAll({
                where: {
                    created_at: {
                        [Op.between]: [mulai, end]
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
                    // get yyyy-mm-dd from data[i].created_at
                    tanggal = moment.utc(data[i].created_at).tz('Asia/Jakarta').format('YYYY-MM-DD');
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
                raw: data
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