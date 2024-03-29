const express = require('express')
const doctor = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const Doctor = require('../models/Doctor')
doctor.use(cors())

process.env.SECRET_KEY = 'secret'

///////////////////////////////////////////////////GET ALL////////////////////////////////////////////////////

doctor.get('/get-all', (req, res, next)=>{
   
    Doctor.findAll({
      order: [
        ['doctor_id', 'DESC'], // Sorts by COLUMN_NAME_EXAMPLE in descending order
  ],
    })
    .then(users => {
        if (users) {
          res.json(users)
        } 
      })
      .catch(err => {
        res.send('error: ' + err)
      })     
 });

 //////////////////////////////////////////////////DOCTOR AVAILABILITY //////////////////////////////////////////////////

 doctor.get('/get-d-availability', (req, res, next)=>{
   
  Doctor.findAll({
    attributes: ['last_name', 'speciality', 'day1', 'day2', 'day3', 'day4', 'day5']
  })
  .then(users => {
      if (users) {
        res.json(users)
      } 
    })
    .catch(err => {
      res.send('error: ' + err)
    })     
});

 ///////////////////////////////////////////////////REGISTER DOCTOR////////////////////////////////////////////////////

doctor.post('/register', (req, res) => {
    const today = new Date()
    const doctorData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password,
      speciality: req.body.speciality,
      day1: req.body.day1,
      day2: req.body.day2,
      day3: req.body.day3,
      day4: req.body.day4,
      day5: req.body.day5,
      created: today
    }
    Doctor.create(doctorData)
    .then(doctor => {
      let token = jwt.sign(doctor.dataValues, process.env.SECRET_KEY, {
        expiresIn: 1440
      })
      res.json({ token: token })
    })
    .catch(err => {
      res.send('error: ' + err)
    })
  })

///////////////////////////////////////////////////UPDATE THE TIME TABLE////////////////////////////////////////////////////
doctor.put('/update', (req, res)=>{
  // let user = req.body;
  const now = new Date()
  const doctorData = {
    username: req.body.username,
    day: req.body.day,
    last_update: now
  }
  const username = req.body.username;
  Doctor.update(doctorData, 
           { 
             where: {
               username: username
              } 
            }
           ).then((doctor) => {
             if(doctor){
              res.status(200).json({msg:"updated succesfully"});
             }
             else {
               res.send('username not found')
             }
           })
           .catch(err => {
            res.send('error: ' + err)
          })       
})

// doctor.put('/update', (req, res)=>{
//     // let user = req.body;
//     const now = new Date()
//     const userData = {
//       username: req.body.username,
//       day: req.body.day,
//       last_update: now
//     }
//     const username = req.body.username;
//     Doctor.update(userData, 
//              { 
//                where: {
//                  username: username
//                 } 
//               }
//              ).then((username) => {
//                if(username){
//                 res.status(200).json({msg:"updated succesfully"});
//                }
//                else {
//                  res.send('username not found')
//                } 
//              })
//              .catch(err => {
//               res.send('error: ' + err)
//             })       
//   })

///////////////////////////////////////////////////DOCTOR LOGIN////////////////////////////////////////////////////
 

doctor.post('/login', (req, res) => {
  Doctor.findOne({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  })
    .then(user => {
      if (user) {
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
          expiresIn: 1440
        })
        res.json({ token: token })
      } else {
        res.send('Doctor does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

// PROFILE

doctor.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  Doctor.findOne({
    where: {
      doctor_id: decoded.doctor_id
    }
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else { 
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = doctor