const express = require('express')
const router = express.Router()

// import controllers
const userController = require('../controllers/userController')

router.get('/', (req, res) => {
    res.json(JSON.parse('{"message": "This is a response from the server!"}'))
})

router.post('/addNewUser', (req, res => {
    userController.addNewUser(req.body.displayName, req.body.email, req.body.password)
}))

router.get('/getUser', userController.getUser)

module.exports = router