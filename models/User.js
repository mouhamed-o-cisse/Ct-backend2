const Sequelize = require('sequelize');
const db = require("../database/db")

module.exports = db.sequelize.define(
    'user',
    {
        id: {
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
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        phone_number: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.STRING
        },
        pdesease: {
            type: Sequelize.STRING
        },
        allergy: {
            type: Sequelize.STRING
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        rendez_vous: {
            type: Sequelize.STRING
        },
        soins_particuliers: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)