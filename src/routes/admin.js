const express = require('express')
const connection = require('../helper/db.js')
const Router = express.Router()
/*
Router.get('/read', (req, res) => {
  const sql = 'SELECT * FROM articles'

  connection.query(sql, (err, result) => {
    if (err) throw err
    return res.status(200).json(result)
  })
  console.log('GET on Articles/Read')
})
*/
module.exports = Router
