const express = require('express')
const router = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const Rdv = require('../models/Rdv')

router.use(cors())

process.env.SECRET_KEY = 'secret'


router.get('/get-rdvs', (req, res, next)=>{
   
    Rdv.findAll()
    .then(rdvs => {
        if (rdvs) {
          res.json(rdvs)
        } 
      })
      .catch(err => {
        res.send('error: ' + err)
      })     
 });

 router.post('/new-rdv', (req, res) => {
    const today = new Date()
    const userData = {
      speciality: req.body.speciality,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      date: req.body.date,
      took: today
    }
          Rdv.create(userData)
            .then(rdv => {
              let token = jwt.sign(rdv.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
              })
              res.json({ token: token })
            })
      .catch(err => {
        res.send('error: ' + err)
      })
  })

  module.exports = router