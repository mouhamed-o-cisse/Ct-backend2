const Sequelize = require('sequelize');
const db = require("../database/db")

module.exports = db.sequelize.define(
    'doctor',
    {
        doctor_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        speciality: {
            type: Sequelize.STRING
        },
        time_table: {
            type: Sequelize.STRING
        },
        day1: {
            type: Sequelize.STRING
        },
        day2: {
            type: Sequelize.STRING
        },
        day3: {
            type: Sequelize.STRING
        },
        day4: {
            type: Sequelize.STRING
        },
        day5: {
            type: Sequelize.STRING
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        last_update: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },
    {
        timestamps: false
    }
)