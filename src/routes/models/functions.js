const connection = require('../../helper/db')
const Joi = require('joi')
//const argon2 = require('argon2')
const db = connection.promise()

const findUsers = id => {
  return db
    .query('SELECT * FROM users WHERE id = ?', [id])
    .then(([results]) => results[0])
}
const findProjects = () => {
  return db
    .query(
      'SELECT p.id, p.name, p.logo, p.estimated_start_date, p.estimated_end_date, p.description, p.localisation, p.team_completed, p.status, u.firstname, u.lastname, d.name FROM project AS p INNER JOIN users AS u ON u.id=p.users_id INNER JOIN domain AS d ON d.id=p.domain_id'
    )
    .then(([results]) => results)
}

const displayUsers = () => {
  return db
    .query(
      'SELECT u.id, u.firstname, u.lastname, u.nickname, u.email, u.phone, u.city, u.country, u.birthday, u.description, p.name, p.description, p.estimated_start_date, p.estimated_end_date, p.status FROM users as u LEFT JOIN project_has_users AS phu ON u.id=phu.users_id LEFT JOIN project AS p ON p.id=phu.project_id'
    )
    .then(([results]) => results)
}

/*
const validate = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional';
  return Joi.object({
    title: Joi.string().max(255).presence(presence),
    director: Joi.string().max(255).presence(presence),
    year: Joi.number().integer().min(1888).presence(presence),
    color: Joi.boolean().presence(presence),
    duration: Joi.number().integer().min(1).presence(presence),
  }).validate(data, { abortEarly: false }).error;
};
*/
module.exports = {
  findUsers,
  displayUsers,
  findProjects
}
