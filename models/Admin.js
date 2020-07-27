const Sequelize = require('sequelize');
const db = require("../database/db")

module.exports = db.sequelize.define(
    'admin',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
    },
    {
        timestamps: false
    }
)