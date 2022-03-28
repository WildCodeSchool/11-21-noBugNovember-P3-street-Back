require('dotenv').config()
const express = require('express')
const Router = express.Router()
const connection = require('../helper/db.js')
const functions = require('./models/functions')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const decode = require('jsonwebtoken/decode')

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
  //------------------------------------------------------------//
  //-------test si l'email user et present dans la bdd ---------//
  //------------------------------------------------------------//

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
  /*
	if (username === "coco@gmail.com") {
		const hashedPassword =
			"$2b$10$2J8Z6E32YMmf8WeQf7jzUuQl9dmlC9Ok.mZLIFTuk.0o8J/qrHL/i"
		const verifyedPassword = await bcrypt.compare(password, hashedPassword)
		// console.log(verifyedPassword)
		if (verifyedPassword) {
			const tokenUserinfo = {
				username: username,
				status: "PouletMaster",
			}
			const token = jwt.sign(tokenUserinfo, process.env.JWT_SECRET)
			console.log(token)
			res.header("Access-Control-Expose-Headers", "x-access-token")
			res.set("x-access-token", token)
			res.status(200).send({ mess: "user connected" })
		}
	}
  */
})
module.exports = Router
