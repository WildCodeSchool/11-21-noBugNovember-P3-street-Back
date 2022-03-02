const express = require('express')
const connection = require('../helper/db.js')
const Router = express.Router()
const functions = require('./models/functions')
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

Router.get('/status_users', (req, res) => {
  const sql = 'SELECT id,blocked,available FROM users'

  connection.query(sql, (err, result) => {
    if (err) throw err
    return res.status(200).json(result)
  })
  console.log('GET on Admin/Status_Users')
})

Router.get('/status_projects', (req, res) => {
  const sql = 'SELECT id,blocked,status,team_completed FROM project'

  connection.query(sql, (err, result) => {
    if (err) throw err
    return res.status(200).json(result)
  })
  console.log('GET on Admin/Status_Projects')
})

// Obtenir les infos de la table users + projets des users
Router.get('/users', (req, res) => {
  console.log(req.body)
  functions
    .displayUsers(req.body)
    .then(user => {
      if (user) res.json(user)
      else res.status(404).send('User not found')
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error retrieving user from database')
    })
})

// Bloquer ou débloquer un projet
Router.put('/projects/:id', (req, res) => {
  const projectId = req.params.id
  connection.query(
    'UPDATE project SET blocked = !blocked WHERE id = ?',
    [projectId],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error blocking a project')
      } else if (result.affectedRows === 0) {
        res.status(404).send(`User with id ${projectId} not found.`)
      } else {
        res.sendStatus(200)
      }
    }
  )
})

// Bloquer ou débloquer un user
Router.put('/block_users/:id', (req, res) => {
  const userId = req.params.id
  connection.query(
    'UPDATE users SET blocked = !blocked WHERE id = ?',
    [userId],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error blocking a user')
      } else if (result.affectedRows === 0) {
        res.status(404).send(`User with id ${userId} not found.`)
      } else {
        res.sendStatus(200)
      }
    }
  )
})

//Modifier une annonce user
Router.put('/users_annonces_update/:id', (req, res) => {
  const annoncePropsToUpdate = req.body
  const annonceId = req.params.id
  connection.query(
    'UPDATE annonces_dispo SET ? WHERE id=?',
    [annoncePropsToUpdate, annonceId],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error updating an announcement')
      } else if (result.affectedRows === 0) {
        res.status(404).send(`Announcement with id ${annonceId} not found.`)
      } else {
        res.sendStatus(200)
      }
    }
  )
})

//Modifier une annonce projet
Router.put('/projet_annonces_update/:id', (req, res) => {
  const projetPropsToUpdate = req.body
  const projetId = req.params.id
  connection.query(
    'UPDATE annonces_dispo SET ? WHERE id=?',
    [projetPropsToUpdate, projetId],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error updating an announcement')
      } else if (result.affectedRows === 0) {
        res.status(404).send(`Announcement with id ${projectId} not found.`)
      } else {
        res.sendStatus(200)
      }
    }
  )
})

//Supprimer l'annonce d'un user
Router.delete('/users_annonces_delete/:id', (req, res) => {
  const annonceId = req.params.id
  connection.query(
    'DELETE FROM annonces_dispo WHERE id=? ',
    [annonceId],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error updating an announcement')
      } else if (result.affectedRows === 0) {
        res.status(404).send(`Announcement with id ${annonceId} not found.`)
      } else {
        res.status(200).send('Annonce deleted')
      }
    }
  )
})

//Supprimer l'annonce d'un projet
Router.delete('/projects_annonces_delete/:id', (req, res) => {
  const annonceId = req.params.id
  connection.query(
    'DELETE FROM search_mate WHERE id=?',
    [annonceId],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error updating an announcement')
      } else if (result.affectedRows === 0) {
        res.status(404).send(`Announcement with id ${annonceId} not found.`)
      } else {
        res.status(200).send('Annonce deleted')
      }
    }
  )
})

module.exports = Router
