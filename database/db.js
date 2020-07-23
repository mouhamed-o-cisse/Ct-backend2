const Sequelize = require('sequelize');
// const { } = require('sequelize');
const db = {};

const sequelize = new Sequelize(
    process.env.CLEARDB_DATABASE_URL, {
    dialect: "mysql",
    pool:{
        max:5,
        min:0,
        aquire: 30000,
        idle: 1000
    },
    // "ssl": {
    //     "rejectUnauthorized":false
    // }
   }
//     "randlogin2", "root", "passwordroot", { 
//     host:"localhost",
//     dialect: "mysql",
//     pool:{
//         max:5,
//         min:0,
//         aquire: 30000,
//         idle: 1000
//     }
//   }
 
)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db; 

// ?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700