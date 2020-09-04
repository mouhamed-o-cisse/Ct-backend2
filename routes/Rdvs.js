const express = require('express')
const router = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const Rdv = require('../models/Rdv')

router.use(cors())

process.env.SECRET_KEY = 'secret'


router.get('/get-rdvs', (req, res, next)=>{
   
    Rdv.findAll({
      order: [
        ['rdv_id', 'DESC'], // Sorts by COLUMN_NAME_EXAMPLE in descending order
  ],
    })
    .then(rdvs => {
        if (rdvs) {
          res.json(rdvs)
        } 
      })
      .catch(err => {
        res.send('error: ' + err)
      })     
 });

 ///////////////////////////////////////////////////////////////////////////////////////////////////////////

//  router.get('/get-doctor-rdvs', (req, res, next)=>{
   
//   Rdv.findAll({
//     where: {
//       speciality : req.params.speciality
//     }
//   })
//   .then(rdvs => {
//       if (rdvs) {
//         res.json(rdvs)
//       } 
//     })
//     .catch(err => {
//       res.send('error: ' + err)
//     })      
// });

router.get('/doctor-rdvs/:speciality', (req, res) => {
  const speciality = req.params.speciality;

  Rdv.findAll({
    where: {
      speciality : speciality
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id
      });
    });
}) 

 //////////////////////////////////////////////////////////////////////////////////////////////////////////

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