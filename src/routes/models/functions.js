const connection = require('../../helper/db')
const Joi = require('joi')
//const argon2 = require('argon2')
const db = connection.promise()

const findUser = id => {
  return db
    .query(
      'SELECT u.firstname, u.lastname, u.avatar, u.email, u.emailVisibility, u.phone, u.phoneVisibility, u.country, u.city, u.birthday, u.twitter, u.instagram, u.youtube, u.spotify, sd.art_name, d.name FROM users AS u INNER JOIN domain AS d INNER JOIN users_has_domain AS uhd INNER JOIN sub_domain AS sd INNER JOIN sub_domain_has_users AS sdhu ON u.id=uhd.users_id AND uhd.domain_id = d.id AND u.id=sdhu.users_id AND sdhu.sub_domain_id=sd.id WHERE u.id=1 AND u.blocked=0',
      [id]
    )
    .then(([results]) => results[0])
}

const findProject = id => {
  return db
    .query(
      'SELECT p.name, p.logo, p.estimated_start_date, p.estimated_end_date, p.description, p.team_completed, p.status, p.localisation, u.firstname, u.lastname, d.name FROM project AS p INNER JOIN users AS u INNER JOIN domain AS d ON d.id=p.domain_id AND u.id=p.users_id WHERE p.id=?',
      [id]
    )
    .then(([results]) => results[0])
}

const projects = () => {
  return db
    .query(
      'SELECT p.name, p.logo, p.estimated_start_date, p.estimated_end_date, p.description, p.team_completed, p.status, p.localisation, u.firstname, u.lastname, d.domain FROM project AS p INNER JOIN users AS u INNER JOIN domain AS d ON d.id=p.domain_id AND u.id=p.users_id'
    )
    .then(([results]) => results)
}

const findAnnoncesUsers = () => {
  return db
    .query(
      'SELECT ad.description, ad.date, u.avatar, u.firstname, u.lastname FROM annonces_dispo AS ad INNER JOIN users AS u ON u.id = ad.users_id'
    )
    .then(([results]) => results)
}

const findAnnonceUser = id => {
  return db
    .query(
      'SELECT ad.description, ad.date, u.avatar, u.firstname, u.lastname FROM annonces_dispo AS ad INNER JOIN users AS u ON u.id = ad.users_id WHERE u.id=?',
      [id]
    )
    .then(([results]) => results[0])
}

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

module.exports = {
  findUser,
  findProject,
  findAnnoncesUsers,
  findAnnonceUser,
  validate,
  projects
}
