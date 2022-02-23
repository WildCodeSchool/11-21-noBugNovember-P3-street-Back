const express = require('express')
const connection = require('../helper/db.js')
const functions = require('./models/functions')
const Router = express.Router()

// //Obtenir la liste des projets
// Router.get('/projects', (req, res) => {
//   functions
//     .findProjects(req.body)
//     .then(user => {
//       if (user) res.json(user)
//       else res.status(404).send('Projects not found')
//     })
//     .catch(err => {
//       console.error(err)
//       res.status(500).send('Error retrieving projects from database')
//     })
// })

//Obtenir les détails d'un projet
Router.get('/project_details', (req, res) => {
  functions
    .findProject(req.body.id)
    .then(user => {
      if (user) res.json(user)
      else res.status(404).send('Project not found')
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error retrieving Project from database')
    })
})

//Obtenir la liste des projets
Router.get('/projects', (req, res) => {
  functions
    .projects()
    .then(user => {
      if (user) res.json(user)
      else res.status(404).send('Project not found')
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error retrieving Project from database')
    })
})

//Obtenir les infos d'un utilisateur
Router.get('/user', (req, res) => {
  functions
    .findUser(req.body.id)
    .then(user => {
      if (user) res.json(user)
      else res.status(404).send('User not found')
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error retrieving user from database')
    })
})

//Avoir tous les utilisateur sauf s'ils sont bloqués
Router.get('/allusers', (req, res) => {
  functions
    .allusers(req.body.id)
    .then(user => {
      if (user) res.json(user)
      else res.status(404).send('User not found')
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error retrieving user from database')
    })
})

//Avoir toutes les annonces de tous les utilisateurs
Router.get('/annonces_all_users', (req, res) => {
  functions
    .findAnnoncesUsers()
    .then(user => {
      if (user) res.json(user)
      else res.status(404).send('Annonce not found')
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error retrieving annonce from database')
    })
})

//Afficher les annonce des utilisateur
Router.get('/annonce_users', (req, res) => {
  functions
    .findAnnonceUser(req.body.id)
    .then(user => {
      if (user) res.json(user)
      else res.status(404).send('Annonce not found')
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error retrieving annonce from database')
    })
})
//Afficher les annonce des utilisateur
Router.get('/annonces_all_projects', (req, res) => {
  functions
    .findAnnoncesProjects()
    .then(user => {
      if (user) res.json(user)
      else res.status(404).send('Annonces not found')
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error retrieving annonce from database')
    })
})

//Récupérer la liste des domaines
Router.get('/domain', (req, res) => {
  sql = 'SELECT * FROM domain'

  connection.query(sql, (err, result) => {
    if (err) throw err
    return res.status(200).send(result)
  })
})

//Récupérer la liste des sous-domaines
Router.get('/subdomain', (req, res) => {
  sql = 'SELECT * FROM sub_domain'

  connection.query(sql, (err, result) => {
    if (err) throw err
    return res.status(200).send(result)
  })
})

//Récupérer les correspondances entre domain et sub-domain
Router.put('/domain_has_sub_domain', (req, res) => {
  sql =
    'SELECT d.domain, sd.art_name, sd.id FROM domain AS d INNER JOIN sub_domain AS sd INNER JOIN domain_has_sub_domain AS dhsd ON d.id=dhsd.domain_id AND sd.id=dhsd.sub_domain_id WHERE d.domain=?'
  const value = [req.body.domain]

  connection.query(sql, value, (err, result) => {
    if (err) throw err
    return res.status(200).send(result)
  })
})

module.exports = Router
