const express = require('express')
const app = express()

const dotenv = require('dotenv')
dotenv.config('./env')

app.get('/', (req, res) => {
    res.json(JSON.parse('{"message": "This is a response from the server!"}'))
})

app.listen(8080, function() {
    console.log('server listening on http://localhost:' + process.env.PORT)
})