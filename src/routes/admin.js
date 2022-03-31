const express = require('express')
const connection = require('../helper/db.js')
const functions = require('./models/functions')
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

//Recherche d'une personne par son nom ou prénom
Router.put('/search_users', (req, res) => {
  const value = ['%' + req.body.name + '%', '%' + req.body.name + '%']
  const sql =
    'SELECT u.id, u.firstname, u.lastname, sd.art_name FROM users AS u INNER JOIN sub_domain AS sd INNER JOIN sub_domain_has_users AS sdhu ON u.id=sdhu.users_id AND sdhu.sub_domain_id=sd.id WHERE lastname LIKE ? OR firstname LIKE ?'

  connection.query(sql, value, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send('Error blocking a project')
    } else if (result.affectedRows === 0) {
      res.status(404).send(`User with id ${projectId} not found.`)
    } else {
      res.status(200).json(result)
    }
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

//Obtenir les détails d'un projet et ses participants
Router.get('/project_details_edit/:id', (req, res) => {
  const id = req.params.id
  sql =
    "SELECT p.name, p.logo, DATE_FORMAT(p.estimated_start_date,'%Y-%m-%d') AS date_start, DATE_FORMAT(p.estimated_end_date,'%Y-%m-%d') AS date_end, p.description, p.status, p.localisation, p.youtubelink,r.id,r.region_name, d.domain,u.firstname, u.lastname, u.avatar FROM project AS p INNER JOIN users AS u ON u.id=p.users_id INNER JOIN domain AS d ON d.id=p.domain_id INNER JOIN region AS r ON p.region_id=r.id WHERE p.id= ?"

  connection.query(sql, id, (err, result) => {
    console.log(id)
    if (err) throw err
    return res.status(200).send(result[0])
  })
})

//Obtenir les détails d'une annonce user
Router.get('/annonceuser_details_edit/:id', (req, res) => {
  const id = req.params.id
  sql =
    'SELECT ad.description_annonce, ad.date, u.avatar, u.firstname, u.lastname FROM annonces_dispo AS ad INNER JOIN users AS u ON u.id = ad.users_id WHERE ad.id=?'

  connection.query(sql, id, (err, result) => {
    console.log(id)
    if (err) throw err
    return res.status(200).send(result[0])
  })
})

//Obtenir les détails d'une annonce projet
Router.get('/annonceprojet_details_edit/:id', (req, res) => {
  const id = req.params.id
  sql =
    'SELECT sm.role,sm.description,sm.date, p.name FROM search_mate AS sm INNER JOIN project AS p ON p.id = sm.project_id WHERE sm.id=?'

  connection.query(sql, id, (err, result) => {
    console.log(id)
    if (err) throw err
    return res.status(200).send(result[0])
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
Router.put('/block_user/:id', (req, res) => {
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

// Bloquer ou débloquer une annonce projet
Router.put('/annonce_project/:id', (req, res) => {
  const annonceId = req.params.id
  connection.query(
    'UPDATE search_mate SET blocked = !blocked WHERE id = ?',
    [annonceId],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error blocking a project')
      } else if (result.affectedRows === 0) {
        res.status(404).send(`User with id ${annonceId} not found.`)
      } else {
        res.sendStatus(200)
      }
    }
  )
})

// Bloquer ou débloquer une annonce user
Router.put('/annonce_user/:id', (req, res) => {
  const annonceId = req.params.id
  connection.query(
    'UPDATE annonces_dispo SET blocked = !blocked WHERE id = ?',
    [annonceId],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error blocking a project')
      } else if (result.affectedRows === 0) {
        res.status(404).send(`User with id ${annonceId} not found.`)
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
  const projectId = req.params.id
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

Router.put('/update_status/:id', (req, res) => {
  const status = req.body.status
  const projetId = req.params.id
  const sql = 'UPDATE project SET status=? WHERE id=?'

  connection.query(sql, [status, projetId], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send('Error updating an announcement')
    } else if (result.affectedRows === 0) {
      res.status(404).send(`Announcement with id ${projetId} not found.`)
    } else {
      res.sendStatus(200)
    }
  })
})

//Modifier un projet
Router.put('/edit_project/:id', (req, res) => {
  const id = req.params.id
  const newAttribut = req.body
  const values = [newAttribut, id]
  const sql = 'UPDATE project SET ?  WHERE id = ?'

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send('Error updating a project')
    } else {
      res.status(204).json(result)
    }
  })
})

//Modifier l'annonce d'un utilisateur
Router.put('/edit_annonce_user/:id', (req, res) => {
  const id = req.params.id
  const newAttribut = req.body
  const values = [newAttribut, id]
  const sql = 'UPDATE annonces_dispo SET ?  WHERE id = ?'

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send('Error updating an annoucement')
    } else {
      res.status(204).json(result)
    }
  })
})

//Modifier l'annonce d'un utilisateur
Router.put('/edit_annonce_project/:id', (req, res) => {
  const id = req.params.id
  const newAttribut = req.body
  const values = [newAttribut, id]
  const sql = 'UPDATE search_mate SET ?  WHERE id = ?'

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send('Error updating an annoucement')
    } else {
      res.status(204).json(result)
    }
  })
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

//Supprimer un utilisateur (!si l'utilisateur est créateur d'un projet, celui-ci est aussi supprimé!)
Router.delete('/delete_user/:id', (req, res) => {
  const userId = req.params.id
  console.log(userId)
  connection.query('DELETE FROM users WHERE id=?', [userId], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send('Error updating an announcement')
    } else if (result.affectedRows === 0) {
      res.status(404).send(`User not found.`)
    } else {
      res.status(200).send('Annonce deleted')
    }
  })
})

//Supprimer un projet
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

//Retrait d'un utilisateur d'un projet
Router.delete('/user_bye_project', (req, res) => {
  const sql = 'DELETE FROM project_has_users WHERE users_id=? AND project_id=?'
  const values = [req.body.users_id, req.body.project_id]

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send('Error updating')
    } else if (result.affectedRows === 0) {
      res.status(404).send(`Announcement with id ${values} not found.`)
    } else {
      res.status(200).send('User deleted from project')
    }
  })
})

//Ajout d'un utilisateur dans un projet
Router.post('/addUserInProject', (req, res) => {
  const { project_id, users_id } = req.body
  let validationErrors = null

  functions
    .findUserInProject(project_id, users_id)
    .then(existingUser => {
      if (existingUser) return Promise.reject('DUPLICATE_USER')
      validationErrors = functions.validateUsersInProject(req.body)
      if (validationErrors) return Promise.reject('INVALID_DATA')
      return functions.addUserInProject(req.body)
    })
    .then(addUser => {
      res.status(201).json(addUser)
    })
    .catch(err => {
      console.error(err)
      if (err === 'DUPLICATE_USER')
        res
          .status(409)
          .json({ message: 'Cet utilisateur est déjà rattaché à ce projet' })
      else if (err === 'INVALID_DATA')
        res.status(422).json({ validationErrors })
      else res.status(500).json({ message: 'Erreur lors de la sauvegarde' })
    })
})

module.exports = Router
