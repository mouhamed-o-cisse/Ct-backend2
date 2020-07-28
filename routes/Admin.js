const express = require('express')
const router = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const Admin = require('../models/Admin')

router.use(cors())

process.env.SECRET_KEY = 'secret'


router.get('/get-all', (req, res, next)=>{
   
    Admin.findAll()
    .then(admin => {
        if (admin) {
          res.json(admin)
        } 
      })
      .catch(err => {
        res.send('error: ' + err)
      })     
 });



router.post('/login', (req, res) => {
    Admin.findOne({
      where: {
        username: req.body.username,
        password: req.body.password
      }
    })
      .then(username => {
        if (username) {
          let token = jwt.sign(username.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.json({ token: token })
        } else {
          res.send('User does not exist')
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      }) 
  })

  module.exports = router