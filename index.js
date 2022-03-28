const cors = require('cors')
const express = require('express') // <-----------
const morgan = require('morgan') // ----
//const fetch = require('node-fetch')
const bodyParser = require('body-parser')
require('dotenv').config()

const admin = require('./src/routes/admin.js')
const all = require('./src/routes/all.js')
const users = require('./src/routes/users.js')
const dbHelper = require('./src/routes/models/functions')

const app = express()

app.use(cors())
app.use('/public', express.static('public'))
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/admin', admin)
app.use('/all', all)
app.use('/users', users);
app.use('/uploads', express.static('uploads'));  

app.post('/createproject', (req, res) => {
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

let server = app.listen(3030, () => {
  console.log('listening on port', server.address().port)
})
