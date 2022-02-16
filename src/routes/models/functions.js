const connection = require('../../helper/db')
const Joi = require('joi')
//const argon2 = require('argon2')
const db = connection.promise()

const findUsers = id => {
  return db
    .query('SELECT * FROM users WHERE id = ?', [id])
    .then(([results]) => results[0])
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
  findUsers
}
