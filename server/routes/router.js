const express = require("express");
const router = express.Router();

// import controllers
const userController = require("../controllers/userController");

router.get("/", function (req, res) {
  res.json(JSON.parse('{"message": "This is a response from the server!"}'));
});

router.post("/addNewUser", (req, res) => {
  userController.addNewUser(
    req.body.displayName,
    req.body.email,
    req.body.password
  );
});

router.get("/getUser", function (req, res) {
  userController.getUser(req, res);
});

router.put("/updateUser", (req, res) => {
  const classes = req.body.classes;
  if (classes) {
    userController.updateUser(req, res, classes);
  } else {
    res.status(404).send("Classes not found.");
  }
});

module.exports = router;