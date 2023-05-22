const express = require("express");
const router = express.Router();
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
};

router.use(cors(corsOptions));

// import controllers
const userController = require("../controllers/userController");

router.get("/", function (req, res) {
  res.json(JSON.parse('{"message": "This is a response from the server!"}'));
});

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
  userController.updateClass(req, res, id);
});

router.delete("/user/:id/removeClass", (req, res) => {
  const id = req.params.id;
  const classId = req.query.classId;
  console.log(classId);
  userController.removeClass(req, res, id, classId);
});
router.delete("/user/:id/removeNote", (req, res) => {
  const id = req.params.id;
  const classId = req.query.classId;
  const noteId = req.query.noteId;
  userController.removeNote(req, res, id, classId, noteId);
});

module.exports = router;
