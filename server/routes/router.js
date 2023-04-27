const express = require("express");
const router = express.Router();

// import controllers
const userController = require("../controllers/userController");

router.get("/", function (req, res) {
  res.json(JSON.parse('{"message": "This is a response from the server!"}'));
});

router.post("/user/add", (req, res) => {
  userController.addNewUser(req, res);
});

router.get("/user/get", function (req, res) {
  userController.getUser(req, res);
});

router.put("/user/:id/updateClasses", (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  userController.updateClasses(req, res, id);
});
router.put("/user/:id/updateClassNote", (req, res) => {
  const id = req.params.id;
  userController.updateClassNote(req, res, id);
});

module.exports = router;
