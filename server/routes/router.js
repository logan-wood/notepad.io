const express = require('express')
const router = express.Router()

// import controllers
const userController = require('../controllers/userController')

router.get('/', (req, res) => {
    res.json(JSON.parse('{"message": "This is a response from the server!"}'))
})

router.post('/addNewUser', userController.addNewUser)

router.get('/getUser', userController.getUser)

module.exports = router