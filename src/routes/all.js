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

//Annonce de l'annonce d'un utilisateur
Router.get('/annonce_user', (req, res) => {
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

module.exports = Router
