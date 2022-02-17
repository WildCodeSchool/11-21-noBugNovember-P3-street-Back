const express = require('express')
const connection = require('../helper/db.js')
const functions = require('./models/functions')
const Router = express.Router()

//Obtenir la liste des projets
Router.get('/projects', (req, res) => {
  functions
    .findProjects(req.body)
    .then(user => {
      if (user) res.json(user)
      else res.status(404).send('Projects not found')
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error retrieving projects from database')
    })
})

//Obtenir les détails d'un projet
Router.get('/project_details/:id', (req, res) => {
  console.log(req.params)
  const sql =
    'SELECT p.id, p.name, p.logo, p.estimated_start_date, p.estimated_end_date, p.description, p.team_completed, p.status, p.localisation, u.firstname, u.lastname, d.name FROM project AS p INNER JOIN users AS u INNER JOIN domain AS d ON d.id=p.domain_id AND u.id=p.users_id WHERE p.id=?;'
  const value = [req.params.id]

  connection.query(sql, value, (err, result) => {
    if (err) throw err
    return res.status(200).json(result)
  })
  console.log('GET on All/project_details')
})

Router.get('/user', (req, res) => {
  console.log(req.body)
  functions
    .findUsers(req.body.id)
    .then(user => {
      if (user) res.json(user)
      else res.status(404).send('User not found')
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error retrieving user from database')
    })
})

module.exports = Router
