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
router.get("/user/:id/getInfo", function (req, res) {
  const id = req.params.id;
  userController.getInfo(req, res, id);
});
// updates and overwrites single class, or adds them if they don't already exist.
router.put("/user/:id/updateClass", (req, res) => {
  const id = req.params.id;
  userController.updateClass(req, res, id);
});

module.exports = router;
