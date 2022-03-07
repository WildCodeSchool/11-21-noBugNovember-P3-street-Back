const express = require('express')
const connection = require('../helper/db.js')
const Router = express.Router()
const functions = require('./models/functions')

//Créer un profil utilisateur
Router.post('/', (req, res) => {
    const { admin, blocked, firstname, lastname, password, email, birthday, phone, forget_password, available, phoneVisibility, emailVisibility, description_users } = req.body;
    console.log(req.body)
    connection.query(
      'INSERT INTO users (admin, blocked, firstname, lastname, password, email, birthday, phone, forget_password, available, phoneVisibility, emailVisibility, description_users) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [admin, blocked, firstname, lastname, password, email, birthday, phone, forget_password, available, phoneVisibility, emailVisibility, description_users],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error saving the user');
        } else {
        const id = result.insertId;
        const createdUser = { id, admin, blocked, firstname, lastname, password, email, birthday, phone, forget_password, available, phoneVisibility, emailVisibility, description_users };
        res.status(201).json(createdUser);
      }
    }
  )
})

module.exports = Router