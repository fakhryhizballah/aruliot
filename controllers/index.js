'use strict';
const e = require('express');
const { sensors} = require('../models');
const { Op } = require("sequelize");
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
                // console.log(data[i].created_at.getHours());

                // if (hour == 0) {
                //     hour = data[i].created_at.getHours();
                //     console.log(hour);
                // }
                if (hour == data[i].created_at.getHours()) {
                    value1 += data[i].value1;
                    value2 += data[i].value2;
                    value3 += data[i].value3;
                    value4 += data[i].value4;
                    value5 += data[i].value5;
                    count++;
                } else {
                  
                    hour = data[i].created_at.getHours() ;
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
    }
}