const express = require('express')
const connection = require('../helper/db.js')
const Router = express.Router()

//Obtenir les détails d'un projet
Router.get('/project_details', (req, res) => {
  console.log(req.body)
  const sql =
    'SELECT p.name, p.logo, p.estimated_start_date, p.estimated_end_date, p.description, p.team_completed, p.status, p.localisation, u.firstname, u.lastname, d.name FROM project AS p INNER JOIN users AS u INNER JOIN domain AS d ON d.id=p.domain_id AND u.id=p.users_id WHERE p.id=?;'
  const value = [req.body.id]

  connection.query(sql, value, (err, result) => {
    if (err) throw err
    return res.status(200).json(result)
  })
  console.log('GET on All/project_details')
})

module.exports = Router
