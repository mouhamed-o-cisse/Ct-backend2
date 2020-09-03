const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express')
const app = express();
const Users = require("./routes/Users");
const Admin = require('./routes/Admin');
const Rdvs = require('./routes/Rdvs')
const db = require('./database/db');
const Doctor = require('./routes/Doctor');


console.log({env: process.env.CLEARDB_DATABASE_URL});

app.use((req, res, next) => {
     
    res.setHeader('Access-Control-Allow-Origin', 'https://newctfrontend.herokuapp.com/',
     'https://www.plateaumedicaltaslima.com', 'http://localhost:4200');

    res.setHeader('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');

    res.setHeader('Access-Control-Allow-Methods', 
    'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    next();
    
  });

app.use(bodyParser.json());

app.use(cors());

app.use(bodyParser.urlencoded
    ({extended: false })
);

app.use("/users", Users)

app.use("/admin", Admin)

app.use("/rdvs", Rdvs)

app.use("/doctors", Doctor)

module.exports = app; 