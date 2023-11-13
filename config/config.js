require('dotenv').config();
const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_HOST,
    DB_DIALECT
} = process.env;

module.exports = {
    "development": {
        "username": DB_USERNAME,
        "password": DB_PASSWORD,
        "database": DB_NAME,
        "host": DB_HOST,
        "dialect": DB_DIALECT,
        dialectOptions: {
            useUTC: false, // for reading from database
        },
        timezone: '+05:30', // for writing to database
    },
    "test": {
        "username": DB_USERNAME,
        "password": DB_PASSWORD,
        "database": DB_NAME,
        "host": DB_HOST,
        "dialect": DB_DIALECT,
        dialectOptions: {
            useUTC: false, // for reading from database
        },
        timezone: '+05:30', // for writing to database
    },
    "production": {
        "username": DB_USERNAME,
        "password": DB_PASSWORD,
        "database": DB_NAME,
        "host": DB_HOST,
        "dialect": DB_DIALECT,
        dialectOptions: {
            useUTC: false, // for reading from database
        },
        timezone: '+05:30', // for writing to database
    }
};
