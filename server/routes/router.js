const express = require("express");
const router = express.Router();

// import controllers
const userController = require("../controllers/userController");

router.get("/", function (req, res) {
  res.json(JSON.parse('{"message": "This is a response from the server!"}'));
});
// adds a new user to the database
// query params: uid
router.post("/user/add", (req, res) => {
  userController.addNewUser(req, res);
});
// retrieves all user data based on uid
// query params: uid
router.get("/user/get", function (req, res) {
  userController.getUser(req, res);
});
// updates and overwrites single class, or adds them if they don't already exist.
router.put("/user/:id/updateClassNote", (req, res) => {
  const id = req.params.id;
  userController.updateClassNote(req, res, id);
});
// returns all classes as JSONs.
router.get("/user/:id/getAllClassNotes", (req, res) => {
  const id = req.params.id;
  userController.getAllClassNotes(req, res, id);
});

module.exports = router;
