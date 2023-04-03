const express = require('express')
const app = express()
const path = require('path')

// environment variables
const dotenv = require('dotenv')
dotenv.config('./env')

// body-parser (for forms)
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// initiate router
const router = require('./routes/router')
app.use(router)


app.listen(8080, function() {
    console.log('server listening on http://localhost:' + process.env.PORT)
})