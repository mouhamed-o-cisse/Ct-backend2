const Sequelize = require('sequelize');
// const { } = require('sequelize');
const db = {};

const sequelize = new Sequelize("randlogin2", "root", "passwordroot", {
    host:"localhost",
    dialect: "mysql",
    // operatorsAliases: false,

    pool:{
        max:5,
        min:0,
        aquire: 30000,
        idle: 1000
    }
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db; 