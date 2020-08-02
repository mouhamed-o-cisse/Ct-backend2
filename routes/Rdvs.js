const express = require('express')
const router = express.Router()
const cors = require('cors')
// const jwt = require('jsonwebtoken')

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
  
    // User.findOne({
    //   where: {
    //     email: req.body.email
    //   }
    // })
      //TODO bcrypt
      .then(rdv => {
        // if (!user) {
          User.create(userData)
            .then(rdv => {
              let token = jwt.sign(rdv.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
              })
              res.json({ token: token })
            })
            // .catch(err => {
            //   res.send('error: ' + err)
            // })
        // }
        //  else {
        //   res.json({ error: 'User already exists' })
        // }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })


//       .then(user => {
//         if (!user) {
//           User.create(userData)
//             .then(user => {
//               let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
//                 expiresIn: 1440
//               })
//               res.json({ token: token })
//             })
//             .catch(err => {
//               res.send('error: ' + err)
//             })
//         } else {
//           res.json({ error: 'User already exists' })
//         }
//       })
//       .catch(err => {
//         res.send('error: ' + err)
//       })
//   })



// router.post('/login', (req, res) => {
//     Admin.findOne({
//       where: {
//         username: req.body.username,
//         password: req.body.password
//       }
//     })
//       .then(username => {
//         if (username) {
//           let token = jwt.sign(username.dataValues, process.env.SECRET_KEY, {
//             expiresIn: 1440
//           })
//           res.json({ token: token })
//         } else {
//           res.send('User does not exist')
//         }
//       })
//       .catch(err => {
//         res.send('error: ' + err)
//       }) 
//   })

  module.exports = router