const express = require('express')
const connection = require('../helper/db.js')
const dbHelper = require('./models/functions')
const Router = express.Router()

Router.delete('/delete_account/:id', (req, res) => {
    console.log("req.params.id")
    dbHelper
      .deleteUserProject(req.params.id)
        .then((deleted) => {
          if (deleted) {
            dbHelper.deleteUserAnnonceDispo(req.params.id)
              .then((deleted1) => {
                if (deleted1) { 
                  console.log('yoloooooo', deleted1)
                }
            // dbHelper.deleteUserOnly(req.params.id)
            // .then((deleted1) => {
          //       if (deleted) res.status(200).send('🎉 User deleted!');
          //       else res.status(404).send('User not found');
              })
          }
          // else res.status(404).send('User not found');
      })
      .catch(err => {
        console.error(err)
        res.status(500).send('Error retrieving Account from database')
      })
  })

  Router.post('/create_project', (req, res) => {
    console.log('poulet')
    dbHelper
      .createProject(req.body)
      .then(created => {
        if (created) res.json(created)
        else res.status(404).send('Project not found')
      })
      .catch(err => {
        console.error(err)
        res.status(500).send('Error retrieving project from database')
      })
  })





  module.exports = Router