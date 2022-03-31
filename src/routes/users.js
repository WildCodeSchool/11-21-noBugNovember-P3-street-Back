const express = require('express')
const connection = require('../helper/db.js')
const dbHelper = require('./models/functions')
const Router = express.Router()

Router.put('/connect', (req, res) => {
  const sql =
    'SELECT id, firstname, admin FROM users WHERE email=? AND password=?'
  const values = [req.body.email, req.body.password]

  connection.query(sql, values, (err, result) => {
    if (err) throw err
    if (result.length === 0) {
      res.status(404).send('error')
    } else {
      res.json(result)
    }
  })
})

Router.delete('/delete_account/:id', (req, res) => {
  console.log('req.params.id')
  dbHelper
    .deleteUserProject(req.params.id)
    .then(deleted => {
      if (deleted) {
        dbHelper.deleteUserAnnonceDispo(req.params.id).then(deleted1 => {
          if (deleted1) {
            console.log('yoloooooo', deleted1)
          }
        })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error retrieving Account from database')
    })
})

Router.post('/createproject', (req, res) => {
  console.log('found route')
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

//Créer un profil utilisateur
Router.post('/submitUser', (req, res) => {
  const sql =
    'INSERT INTO users (admin, blocked, firstname, lastname, password, email, phone,birthday, city, country,youtube, instagram, twitter, spotify,tiktok, forget_password, available, phoneVisibility, emailVisibility, description_users) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?);'
  const sql1 = 'INSERT INTO users_has_domain (users_id,domain_id) VALUES(?,?);'
  const sql2 =
    'INSERT INTO sub_domain_has_users (sub_domain_id,users_id) VALUES (?,?);'

  const {
    admin,
    blocked,
    firstname,
    lastname,
    password,
    email,
    phone,
    birthday,
    city,
    country,
    youtube,
    instagram,
    twitter,
    spotify,
    tiktok,
    forget_password,
    available,
    phoneVisibility,
    emailVisibility,
    description_users,
    domain_id,
    sub_domain_id
  } = req.body

  let values = [
    admin,
    blocked,
    firstname,
    lastname,
    password,
    email,
    phone,
    birthday,
    city,
    country,
    youtube,
    instagram,
    twitter,
    spotify,
    tiktok,
    forget_password,
    available,
    phoneVisibility,
    emailVisibility,
    description_users
  ]

  console.log(values)
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error(err)
      res.sendStatus(500)
    } else {
      const id = result.insertId
      console.log(id)
      let values2 = [id, domain_id]
      connection.query(sql1, values2, (err2, result2) => {
        if (err2) {
          console.error(err2)
          res.sendStatus(500)
        } else {
          let values3 = [sub_domain_id, id]
          connection.query(sql2, values3, (err3, result3) => {
            if (err3) {
              console.error(err3)
              res.sendStatus(500)
            } else {
              res.status(200).json(result)
            }
          })
        }
      })
    }
  })
})

//Créer une annonce utilisateur
Router.post('/submitAnnonceUser', (req, res) => {
  const sql =
    'INSERT INTO annonces_dispo (description_annonce,date,users_id,blocked) VALUES (?,?,?,?)'
  const { description_annonce, date, users_id, blocked } = req.body
  let values = [description_annonce, date, users_id, blocked]
  connection.query(sql, values, (err, result) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.status(200).json(result)
    }
  })
})

//Créer une annonce projet
Router.post('/submitAnnonceProject', (req, res) => {
  const sql =
    'INSERT INTO search_mate (role, description,date,project_id,blocked) VALUES (?,?,?,?,?)'
  const { role, description, date, project_id, blocked } = req.body
  let values = [role, description, date, project_id, blocked]
  connection.query(sql, values, (err, result) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.status(200).json(result)
    }
  })
})

//Récupérer profil utilisateur
Router.get('/profil/:id', (req, res) => {
  const userId = req.params.id
  const sql =
    "SELECT u.avatar, DATE_FORMAT(u.birthday, '%d/%m/%Y') AS birthday, u.city, u.country,u.city, u.description_users, u.email, u.firstname, u.lastname, u.nickname, u.phone, u.spotify, u.instagram,u.tiktok,u.twitter,u.youtube, d.domain, sd.art_name FROM users AS u INNER JOIN domain AS d INNER JOIN users_has_domain as uhd ON u.id=uhd.users_id INNER JOIN sub_domain_has_users as sdhu INNER JOIN sub_domain as sd ON sd.id=sdhu.sub_domain_id  WHERE u.id = ?"
  connection.query(sql, userId, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error retrieving a user from database')
    } else {
      res.json(result[0])
    }
  })
})

//Modifier un profil user
Router.put('/update_profil/:id', (req, res) => {
  const profilPropsToUpdate = req.body
  const profilId = req.params.id
  connection.query(
    'UPDATE users SET ? WHERE id=?',
    [profilPropsToUpdate, profilId],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error updating an announcement')
      } else if (result.affectedRows === 0) {
        res.status(404).send(`Announcement with id ${profilId} not found.`)
      } else {
        res.sendStatus(200)
      }
    }
  )
})

module.exports = Router
