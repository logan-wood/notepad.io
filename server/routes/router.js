const express = require('express')
const router = express.Router()

// import controllers
const userController = require('../controllers/userController')

router.get('/', function(req, res) {
    console.log(req.session)
    res.send('This is a response from the server!')
})

// use this route to get session info
router.get('/getSession', function(req, res) {
    userController.getUserSession(req, res);
})

router.post('/addNewUser', (req, res) => {
    userController.addNewUser(req.body.displayName, req.body.email, req.body.password)
})

router.get('/getUser', function(req, res) {
    userController.getUser(req, res)
})

router.post('/loginUser', function(req, res) {
    userController.loginUser(req, res)
})

router.get('/logoutUser', function(req, res) {
    userController.logoutUser(req, res)
})

module.exports = router