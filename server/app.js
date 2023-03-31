const express = require('express')
const app = express()
const path = require('path')

// environment variables
const dotenv = require('dotenv')
dotenv.config('./env')

// initiate router
const router = require('./routes/router')
app.use(router)


app.listen(8080, function() {
    console.log('server listening on http://localhost:' + process.env.PORT)
})