const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
require('dotenv').config()

const admin = require('./src/routes/admin.js')
const all = require('./src/routes/all.js')
const auth = require('./src/routes/auth.js')
const users = require('./src/routes/users.js')
const dbHelper = require('./src/routes/models/functions')

const app = express()

app.use(cors())
app.use('/public', express.static('public'))
app.use('/assets', express.static('assets'))
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/admin', admin)
app.use('/all', all)
app.use('/auth', auth)
app.use('/users', users)
app.use('/uploads', express.static('uploads'))

let server = app.listen(3030, () => {
  console.log('listening on port', server.address().port)
})
