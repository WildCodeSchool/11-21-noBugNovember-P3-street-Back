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

// Obtenir les users validés
Router.get('/validated_users', (req, res) => {
  console.log(req.body)
  functions
    .displayValidatedUsers(req.body)
    .then(user => {
      if (user) res.json(user)
      else res.status(404).send('User not found')
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error retrieving user from database')
    })
})

// Obtenir les users non validés
Router.get('/blocked_users', (req, res) => {
  console.log(req.body)
  functions
    .displayBlockedUsers(req.body)
    .then(user => {
      if (user) res.json(user)
      else res.status(404).send('User not found')
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error retrieving user from database')
    })
})

//Obtenir la liste des projets validés
Router.get('/validated_projects', (req, res) => {
  const sql =
    "SELECT p.id, p.name, p.description, p.logo, DATE_FORMAT(p.estimated_start_date,'%d/%m/%Y') AS date, p.status, u.firstname, u.lastname, u.phone, u.email, r.region_name FROM project AS p INNER JOIN region AS r ON p.region_id = r.id INNER JOIN users AS u ON u.id = p.users_id WHERE p.blocked=0 ORDER BY p.id DESC"

  connection.query(sql, (err, result) => {
    if (err) throw err
    return res.status(200).send(result)
  })
  console.log('GET on /admin/validated_projects')
})

//Obtenir la liste des projets bloqués
Router.get('/blocked_projects', (req, res) => {
  const sql =
    "SELECT p.id, p.name, p.description, p.logo, DATE_FORMAT(p.estimated_start_date,'%d/%m/%Y') AS date, p.status, u.firstname, u.lastname, u.phone, u.email, r.region_name FROM project AS p INNER JOIN region AS r ON p.region_id = r.id INNER JOIN users AS u ON u.id = p.users_id WHERE p.blocked=1 ORDER BY p.id DESC"

  connection.query(sql, (err, result) => {
    if (err) throw err
    return res.status(200).send(result)
  })
  console.log('GET on /admin/blocked_projects')
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
Router.put('/block_user/:id', (req, res) => {
  console.log(req.params.id)
  const userId = req.params.id
  const blocked = req.body.blocked
  connection.query(
    'UPDATE users SET blocked = ? WHERE id = ?',
    [blocked, userId],
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

//Supprimer l'annonce d'un utilisateur
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

Router.delete('/project_delete/:id', (req, res) => {
  const value = req.params.id
  const sql = 'DELETE FROM project WHERE id=?'

  connection.query(sql, value, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send('Error updating an announcement')
    } else if (result.affectedRows === 0) {
      res.status(404).send(`Announcement with id ${annonceId} not found.`)
    } else {
      res.status(200).send('Annonce deleted')
    }
  })
})

module.exports = Router
