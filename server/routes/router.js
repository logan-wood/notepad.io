const express = require("express");
const router = express.Router();
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
};

router.use(cors(corsOptions));

// import controllers
const userController = require("../controllers/userController");

router.get('/', function(req, res) {
    console.log(req.session)
    res.send('This is a response from the server!')
})

// use this route to get session info
router.get('/getSession', function(req, res) {
    userController.getUserSession(req, res);
})

router.post('/addNewUser', (req, res) => {
    userController.addNewUser(req, res)
})

router.get('/getUser', function(req, res) {
    userController.getUser(req, res)
})

// authenticates whether the email matches the password. Does not set a session or cookie in its current implementation
router.post('/loginUser', function(req, res) {
    userController.loginUser(req, res)
})

// retrieves all user data based on uid
// query params: uid
router.get("/user/:id/getInfo", function (req, res) {
  const id = req.params.id;
  userController.getInfo(req, res, id);
});
// updates and overwrites single class, or adds them if they don't already exist.
router.put("/user/:id/updateClass", (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  userController.updateClass(req, res, id);
});

module.exports = router;
