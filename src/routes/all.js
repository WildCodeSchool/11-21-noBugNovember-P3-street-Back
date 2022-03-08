const express = require('express')
const connection = require('../helper/db.js')
const functions = require('./models/functions')
const Router = express.Router()

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
      res.status(500).send('Error retrieving projects from database')
    })
})

//Obtenir les détails d'un projet et ses participants
Router.get('/project_details/:id', (req, res) => {
  const id = req.params.id
  sql =
    'SELECT p.id, p.name, p.logo, p.estimated_start_date, p.estimated_end_date, p.description, p.status, p.localisation, p.youtubelink,  d.domain,u.firstname, u.lastname, u.avatar FROM project AS p INNER JOIN users AS u ON u.id=p.users_id INNER JOIN domain AS d ON d.id=p.domain_id WHERE p.id= ?'

  connection.query(sql, id, (err, result) => {
    console.log(id)
    if (err) throw err
    return res.status(200).send(result)
  })
})
//Obtenir la liste des users d'un projet
Router.get('/project_users/:id', (req, res) => {
  console.log(req.body)
  sql =
    'SELECT u.id, u.lastname, u.firstname, u.avatar  FROM users AS u INNER JOIN project AS p INNER JOIN project_has_users AS phu ON p.id=phu.project_id AND u.id=phu.users_id WHERE p.id=?'
  const value = req.params.id

  connection.query(sql, value, (err, result) => {
    if (err) throw err
    return res.status(200).send(result)
  })
})

//Obtenir la liste des projets crée par un user
Router.put('/project_creator', (req, res) => {
  sql =
    'SELECT p.id, p.name, p.logo, p.status, p.youtubelink, p.description, d.domain FROM project AS p INNER JOIN domain AS d ON p.domain_id=d.id WHERE p.users_id=?'
  const value = [req.body.id]

  connection.query(sql, value, (err, result) => {
    if (err) throw err
    return res.status(200).send(result)
  })
})

//Obtenir les infos d'un utilisateur
Router.put('/user', (req, res) => {
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
    .allusers()
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
      else res.status(404).send('Annonces not found')
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error retrieving annonces from database')
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

//Obtenir la liste des projet où l'utilisateur a participé
Router.put('/userhasprojects', (req, res) => {
  sql =
    'SELECT p.id, p.name, p.logo, p.status, d.domain FROM project AS p INNER JOIN domain AS d INNER JOIN users AS u INNER JOIN project_has_users AS phu ON u.id=phu.users_id AND phu.project_id=p.id AND p.domain_id=d.id WHERE u.id=?'
  const value = [req.body.id]

  connection.query(sql, value, (err, result) => {
    if (err) throw err
    return res.status(200).send(result)
  })
})

Router.get('/creatorproject/:id', (req, res) => {
  sql =
    'SELECT u.id, u.lastname, u.firstname FROM users AS u INNER JOIN project AS p ON u.id = p.users_id WHERE p.id =?'
  const value = [req.params.id]

  connection.query(sql, value, (err, result) => {
    if (err) throw err
    return res.status(200).send(result)
  })
})

module.exports = Router
