const cors = require('cors')
const express = require('express') // <-----------
const morgan = require('morgan') // ----
//const fetch = require('node-fetch')
const bodyParser = require('body-parser')
require('dotenv').config()

//const admin = require('./src/routes/admin.js')
const all = require('./src/routes/all.js')
const users = require('./src/routes/users.js')

const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

//app.use("/admin", admin);
app.use('/all', all)
app.use("/users", users);

let server = app.listen(3030, () => {
  console.log('listening on port', server.address().port)
})
