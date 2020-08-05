const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.get('/get-all', (req, res, next)=>{
   
    User.findAll({
      order: [
        ['id', 'DESC'], // Sorts by COLUMN_NAME_EXAMPLE in descending order
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

 // Find a Customer by Id
//  users.get('/get-one', (req, res) => {  
//   // User.findById(req.params.id)
//   User.findOne({
//         where: {
//           id: req.body.id
//         }
//       })
//   .then(user => {
//     res.json(user);
//   })
//  }) 


 users.get('/get-one', (req, res, next)=>{
  User.findOne({
    where: {
      id: req.body.id
    }
  })
  .then(user => {
      if (user) {
        res.json(user)
      } 
      else{
        res.json({ error: 'User do not exists' })
      }
    })

    .catch(err => {
      res.send('error: ' + err)
    })     
});

users.get('/get/:id', (req, res, next)=>{
  User.findOne({
    where: {
      id: req.body.id
    }
  })
  .then(user => {
      if (user) {
        res.json(user)
      } 
      else{
        res.json({ error: 'User do not exists' })
      }
    })

    .catch(err => {
      res.send('error: ' + err)
    })     
});


users.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    phone_number: req.body.phone_number,
    age: req.body.age,
    pdesease: req.body.pdesease,
    allergy: req.body.allergy,
    created: today
  }

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        User.create(userData)
          .then(user => {
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
              expiresIn: 1440
            })
            res.json({ token: token })
          })
          .catch(err => {
            res.send('error: ' + err)
          })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.put('/update', (req, res)=>{
  // let user = req.body;
  const now = new Date()
  const userData = {
    email: req.body.email,
    antecedents_personnels: req.body.antecedents_personnels,
    antecedents_familiaux: req.body.antecedents_familiaux,
    motif_de_consultation: req.body.motif_de_consultation,
    bilan: req.body.bilan,
    diagnostic: req.body.diagnostic,
    traitement_recu: req.body.traitement_recu,
    ordonnance: req.body.ordonnance,
    evolution: req.body.evolution,
    pro_rdv: req.body.pro_rdv,
    last_update: now
  }
  const email = req.body.email;
  User.update(userData, 
           { 
             where: {
               email: email
              } 
            }
           ).then((email) => {
             if(email){
              res.status(200).json({msg:"updated succesfully"});
             }
             else {
               res.send('Email not found')
             }
           })
           .catch(err => {
            res.send('error: ' + err)
          })       
})
 

users.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
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
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

// PROFILE

users.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    where: {
      id: decoded.id
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

module.exports = users