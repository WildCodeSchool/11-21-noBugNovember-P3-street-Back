const connection = require('../../helper/db')
const Joi = require('joi')
//const argon2 = require('argon2')
const db = connection.promise()

//Trouver un utilisateur en particulier
const findUser = id => {
  return db
    .query(
      'SELECT u.firstname, u.lastname, u.available, u.description_users, u.avatar, u.email, u.emailVisibility, u.phone, u.phoneVisibility, u.country, u.city, u.birthday, u.twitter, u.instagram, u.youtube, u.spotify, u.tiktok, sd.art_name, d.domain FROM users AS u INNER JOIN domain AS d INNER JOIN users_has_domain AS uhd INNER JOIN sub_domain AS sd INNER JOIN sub_domain_has_users AS sdhu ON u.id=uhd.users_id AND uhd.domain_id = d.id AND u.id=sdhu.users_id AND sdhu.sub_domain_id=sd.id WHERE u.id=? AND u.blocked=0',
      [id]
    )
    .then(([results]) => results[0])
}
const displayUsers = () => {
  return db
    .query(
      'SELECT u.id, u.firstname, u.lastname, u.nickname, u.email, u.phone, u.city, u.country, u.birthday, u.description_users,u.avatar, u.blocked, p.name, p.estimated_start_date, p.estimated_end_date, p.status, sd.art_name FROM users as u INNER JOIN sub_domain_has_users AS sdhu ON u.id=sdhu.users_id INNER JOIN sub_domain AS sd ON sd.id=sdhu.sub_domain_id LEFT JOIN project_has_users AS phu ON u.id=phu.users_id LEFT JOIN project AS p ON p.id=phu.project_id'
    )
    .then(([results]) => results)
}

const displayValidatedUsers = () => {
  return db
    .query(
      'SELECT u.id, u.firstname, u.lastname, u.avatar, u.email, u.phone, u.city,  u.description_users, u.blocked, u.available, sd.art_name FROM users AS u INNER JOIN sub_domain_has_users AS sdhu INNER JOIN sub_domain AS sd ON sd.id=sdhu.sub_domain_id AND u.id=sdhu.users_id WHERE blocked=0 ORDER BY lastname, firstname DESC'
    )
    .then(([results]) => results)
}
const displayBlockedUsers = () => {
  return db
    .query(
      'SELECT u.id, u.firstname, u.lastname, u.avatar, u.email, u.phone, u.city,  u.description_users, u.blocked, u.available, sd.art_name FROM users AS u INNER JOIN sub_domain_has_users AS sdhu INNER JOIN sub_domain AS sd ON sd.id=sdhu.sub_domain_id AND u.id=sdhu.users_id WHERE blocked=1 ORDER BY lastname, firstname DESC'
    )
    .then(([results]) => results)
}
// Liste de tous les utilisateurs
const allusers = () => {
  return db
    .query(
      'SELECT u.id, u.firstname, u.lastname, u.avatar, u.email, u.emailVisibility, u.available, u.phone, u.phoneVisibility, u.country, u.city, u.twitter, u.instagram, u.youtube, u.spotify, u.tiktok, u.description_users, sd.art_name, d.domain FROM users AS u INNER JOIN domain AS d INNER JOIN users_has_domain AS uhd INNER JOIN sub_domain AS sd INNER JOIN sub_domain_has_users AS sdhu ON u.id=uhd.users_id AND uhd.domain_id = d.id AND u.id=sdhu.users_id AND sdhu.sub_domain_id=sd.id WHERE u.blocked=0'
    )
    .then(([results]) => results)
}

//Choisir un projet en particulier
const findProject = id => {
  return db
    .query(
      'SELECT p.id, p.name, p.logo, p.estimated_start_date, p.estimated_end_date, p.description, p.team_completed, p.status, p.localisation, p.youtubelink, d.domain, u.id, u.lastname , u.firstname, u.avatar FROM users AS u INNER JOIN project_has_users AS phu ON u.id=phu.users_id INNER JOIN project AS p ON p.id=phu.project_id INNER JOIN domain AS d ON d.id=p.domain_id WHERE p.id=?',
      [id]
    )
    .then(([results]) => results[0])
}

//Liste des projets
const projects = id => {
  return db
    .query(
      'SELECT p.id, p.name, p.logo, p.estimated_start_date, p.estimated_end_date, p.description, p.team_completed, p.status, p.localisation, d.domain, r.region_name FROM project AS p INNER JOIN domain AS d ON d.id=p.domain_id INNER JOIN region AS r ON r.id=p.region_id WHERE p.blocked=0 ORDER BY p.id DESC'
    )
    .then(([results]) => results)
}

//Obtenir la liste des participants à un projet (hors créateur)
const projectshasusers = () => {
  return db
    .query(
      'SELECT p.name, p.logo, p.status, d.domain FROM project AS p INNER JOIN users AS u INNER JOIN domain AS d INNER JOIN project_has_users AS phu ON d.id=p.domain_id AND phu.users_id=u.id AND p.id=phu.project_id WHERE u.id=?'
    )
    .then(([results]) => results)
}

//Obtenir la liste des annonces des users
const findValidatedAnnoncesUsers = () => {
  return db
    .query(
      'SELECT ad.id, d.domain, sd.art_name, ad.description_annonce, ad.date, ad.blocked, u.firstname, u.lastname, u.avatar, u.email, u.emailVisibility, u.phone, u.phoneVisibility, u.country, u.city, u.birthday, u.twitter, u.instagram, u.youtube, u.spotify FROM annonces_dispo AS ad INNER JOIN users AS u INNER JOIN domain AS D INNER JOIN sub_domain AS sd INNER JOIN users_has_domain AS uhd INNER JOIN sub_domain_has_users AS sdhu ON u.id = ad.users_id AND u.id=sdhu.users_id AND sdhu.sub_domain_id=sd.id AND u.id=uhd.users_id AND uhd.domain_id=d.id WHERE ad.blocked = 0'
    )
    .then(([results]) => results)
}

const findNonValidatedAnnoncesUsers = () => {
  return db
    .query(
      'SELECT ad.id, d.domain, sd.art_name, ad.description_annonce, ad.date, ad.blocked, u.firstname, u.lastname, u.avatar, u.email, u.emailVisibility, u.phone, u.phoneVisibility, u.country, u.city, u.birthday, u.twitter, u.instagram, u.youtube, u.spotify FROM annonces_dispo AS ad INNER JOIN users AS u INNER JOIN domain AS D INNER JOIN sub_domain AS sd INNER JOIN users_has_domain AS uhd INNER JOIN sub_domain_has_users AS sdhu ON u.id = ad.users_id AND u.id=sdhu.users_id AND sdhu.sub_domain_id=sd.id AND u.id=uhd.users_id AND uhd.domain_id=d.id WHERE ad.blocked= 1'
    )
    .then(([results]) => results)
}

//Obtenir l'annonce d'un utilisateur
const findAnnonceUser = id => {
  return db
    .query(
      'SELECT ad.description, ad.date, u.avatar, u.firstname, u.lastname FROM annonces_dispo AS ad INNER JOIN users AS u ON u.id = ad.users_id WHERE u.id=?',
      [id]
    )
    .then(([results]) => results[0])
}

const deleteUserProject = id => {
  return db
    .query('DELETE FROM project_has_users WHERE users_id=?;', [id])
    .then(([result]) => result.affectedRows !== 0)
}

const deleteUserAnnonceDispo = id => {
  return db
    .query('DELETE FROM annonces_dispo WHERE users_id=?;', [id])
    .then(([result]) => result.affectedRows !== 0)
}

const deleteUserOnly = id => {
  return db.query(
    'DELETE u FROM users AS u INNER JOIN project_has_users AS phu INNER JOIN project AS p INNER JOIN sub_domain_has_users AS sdhu INNER JOIN annonces_dispo AS ad ON u.id=p.users_id AND u.id=dhsd.users_id AND u.id=sdhu.users_id AND u.id=ad.users_id WHERE u.id=?',
    [id]
  )
}

const createProject = body => {
  console.log(body)
  const {
    name,
    logo,
    estimated_start_date,
    estimated_end_date,
    description,
    localisation,
    team_completed,
    status,
    domain_id,
    users_id,
    blocked,
    region_id
  } = body
  return db
    .query(
      'INSERT INTO project (name, logo, estimated_start_date, estimated_end_date, description, localisation, team_completed, status, domain_id, users_id, blocked, region_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        name,
        logo,
        estimated_start_date,
        estimated_end_date,
        description,
        localisation,
        team_completed,
        status,
        domain_id,
        users_id,
        blocked,
        region_id
      ]
    )
    .then(([result]) => result.affectedRows !== 0)
}

const validateProject = (params, forProject = true) => {
  const presence1 = forProject ? 'required' : 'optional'
  return Joi.object({
    name: Joi.string().presence(presence1).required(),
    logo: Joi.string().presence(presence1).required(),
    estimated_start_date: Joi.number().max(45).presence(presence1).required(),
    estimated_end_date: Joi.number().max(45).presence(presence1).required(),
    localisation: Joi.string().max(45).required(),
    team_completed: Joi.number.presence(presence1).required(),
    status: Joi.number.presence(presence1).required(),
    domain_id: Joi.number.presence(presence1).required(),
    users_id: Joi.number.presence(presence1).required(),
    bloked: Joi.number.presence(presence1).required()
  }).validate(params, { abortEarly: false }).error
}

const findValidatedAnnoncesProjects = () => {
  return db
    .query(
      'SELECT sm.id, sm.role, sm.description, sm.date, sm.blocked, p.name, p.logo, p.estimated_start_date, p.estimated_end_date, p.localisation, d.domain FROM search_mate AS sm LEFT JOIN project AS p ON p.id=sm.project_id INNER JOIN domain AS d ON d.id=p.domain_id WHERE sm.blocked = 0 ORDER BY p.id, sm.role DESC;'
    )
    .then(([results]) => results)
}
const findNonValidatedAnnoncesProjects = () => {
  return db
    .query(
      'SELECT sm.id, sm.role, sm.description, sm.date, sm.blocked, p.name, p.logo, p.estimated_start_date, p.estimated_end_date, p.localisation, d.domain FROM search_mate AS sm LEFT JOIN project AS p ON p.id=sm.project_id INNER JOIN domain AS d ON d.id=p.domain_id WHERE sm.blocked = 1 ORDER BY p.id, sm.role DESC;'
    )
    .then(([results]) => results)
}

//Valider les données de la création d'un compte
const validate = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional'
  return Joi.object({
    admin: Joi.boolean().presence(presence).required(),
    blocked: Joi.boolean().presence(presence).required(),
    firstname: Joi.string().max(45).presence(presence).required(),
    lastname: Joi.string().max(45).presence(presence).required(),
    nickname: Joi.string().max(45),
    password: Joi.string().max(255).presence(presence).required(),
    avatar: Joi.string().max(255),
    email: Joi.string.max(255).presence(presence).required(),
    phone: Joi.number().presence(),
    city: Joi.string().max(255),
    country: Joi.string().max(255),
    birthday: Joi.date().presence(presence).required(),
    twitter: Joi.string().max(255),
    instagram: Joi.string().max(255),
    youtube: Joi.string().max(255),
    spotify: Joi.string().max(255),
    description: Joi.string(),
    forget_password: Joi.string().max(255).required(),
    available: Joi.boolean().required(),
    phoneVisibilty: Joi.boolean().required(),
    emailVisibilty: Joi.boolean().required()
  }).validate(data, { abortEarly: false }).error
}

const findUserInProject = (project_id, users_id) => {
  return db
    .query(
      'SELECT * FROM project_has_users WHERE project_id = ? AND users_id = ?',
      [project_id, users_id]
    )
    .then(([results]) => results[0])
}

const validateUsersInProject = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional'
  return Joi.object({
    project_id: Joi.number().presence(presence),
    users_id: Joi.number().presence(presence)
  }).validate(data, { abortEarly: false }).error
}

const addUserInProject = ({ project_id, users_id }) => {
  return db
    .query(
      'INSERT INTO project_has_users (project_id, users_id) VALUES (?, ?)',
      [project_id, users_id]
    )
    .then(([result]) => {
      const id = result.insertId
      return { project_id, users_id }
    })
}

const existingUser = ({ email, password }) => {
  return db
    .query(
      'SELECT id, firstname, blocked FROM users WHERE email=? AND password=? AND blocked=0',
      [email, password]
    )
    .then(([results]) => results[0])
}

const isAdmin = ({ id }) => {
  return db
    .query('SELECT admin FROM users WHERE id=?', [id])
    .then(([results]) => results[0])
}

module.exports = {
  addUserInProject,
  allusers,
  createProject,
  deleteUserOnly,
  deleteUserProject,
  displayBlockedUsers,
  displayUsers,
  displayValidatedUsers,
  existingUser,
  findValidatedAnnoncesUsers,
  findNonValidatedAnnoncesUsers,
  findAnnonceUser,
  findValidatedAnnoncesProjects,
  findNonValidatedAnnoncesProjects,
  findProject,
  findUser,
  findUserInProject,
  isAdmin,
  projects,
  projectshasusers,
  validate,
  validateProject,
  validateUsersInProject,
  existingUser
}
