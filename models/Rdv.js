const Sequelize = require('sequelize');
const db = require("../database/db")

module.exports = db.sequelize.define(
    'rdv',
    {
        rdv_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        speciality: {
            type: Sequelize.STRING
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        phoneNumber: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.STRING
        },
        took: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
        
    },
    {
        timestamps: false
    }
)