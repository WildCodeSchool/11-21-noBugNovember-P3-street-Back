const express = require('express')
const connection = require('../helper/db.js')
const Router = express.Router()
const functions = require('./models/functions')

//Créer un profil utilisateur
Router.post('/submitUser', (req, res) => {
  const sql =
    'INSERT INTO users (admin, blocked, firstname, lastname, password, email, phone,birthday, city, country,youtube, instagram, twitter, spotify, forget_password, available, phoneVisibility, emailVisibility, description_users) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
  const sql1 = 'INSERT INTO users_has_domain (users_id,domain_id) VALUES(?,?);'
  const sql2 =
    'INSERT INTO sub_domain_has_users (sub_domain_id,users_id) VALUES (?,?);'

  const {
    admin,
    blocked,
    firstname,
    lastname,
    password,
    email,
    phone,
    birthday,
    city,
    country,
    youtube,
    instagram,
    twitter,
    spotify,
    forget_password,
    available,
    phoneVisibility,
    emailVisibility,
    description_users,
    domain_id,
    sub_domain_id
  } = req.body

  let values = [
    admin,
    blocked,
    firstname,
    lastname,
    password,
    email,
    phone,
    birthday,
    city,
    country,
    youtube,
    instagram,
    twitter,
    spotify,
    forget_password,
    available,
    phoneVisibility,
    emailVisibility,
    description_users
  ]

  console.log(values)
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error(err)
      res.sendStatus(500)
    } else {
      const id = result.insertId
      console.log(id)
      let values2 = [id, domain_id]
      connection.query(sql1, values2, (err2, result2) => {
        if (err2) {
          console.error(err2)
          res.sendStatus(500)
        } else {
          let values3 = [sub_domain_id, id]
          connection.query(sql2, values3, (err3, result3) => {
            if (err3) {
              console.error(err3)
              res.sendStatus(500)
            } else {
              res.status(200).json(result)
            }
          })
        }
      })
    }
  })
})

module.exports = Router
