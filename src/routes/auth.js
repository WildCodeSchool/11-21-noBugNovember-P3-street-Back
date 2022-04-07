require('dotenv').config()
const express = require('express')
const Router = express.Router()
const connection = require('../helper/db.js')
const functions = require('./models/functions')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const decode = require('jsonwebtoken/decode')
const jwt_decode = require('jwt-decode')

const getToken = req => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1]
  } else if (req.query && req.query.token) {
    return req.query.token
  }
  return null
}

//routes
Router.post('/protected_admin', (req, res) => {
  const token = getToken(req)
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return res.status(403).send({ acces: false })
    } else {
      let id = jwt_decode(token)
      functions.isAdmin(id).then(tmts => {
        if (tmts.admin === 1) {
          return res.status(200).send({ acces: true })
        } else {
          return res.status(403).send({ acces: false })
        }
      })
    }
  })
})

Router.post('/protected', (req, res) => {
  const token = getToken(req)
  console.log(token)
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return res.status(403).send({ acces: false })
    } else {
      return res.status(200).send({ acces: true })
    }
  })
})

Router.post('/login', async (req, res) => {
  const { password, email } = req.body
  //------------------------------------------------------------------------//
  //-------test si l'email et le password sont present dans la bdd ---------//
  //------------------------------------------------------------------------//

  functions
    .existingUser({ email, password })
    .then(result => {
      if (result) {
        const tokenUserinfo = {
          id: result.id,
          name: result.firstname
        }
        const token = jwt.sign(tokenUserinfo, process.env.JWT_SECRET)
        res.header('Access-Control-Expose-Headers', 'x-access-token')
        res.set('x-access-token', token)
        res.status(200).send({ mess: 'user connected' })
      } else res.status(404).send('User not found')
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error retrieving user from database')
    })
})
module.exports = Router
