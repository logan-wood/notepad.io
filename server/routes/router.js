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
router.get("/getSession", function (req, res) {
  userController.getUserSession(req, res);
});

router.post("/addNewUser", (req, res) => {
  userController.addNewUser(req, res);
});

router.get("/getUser", function (req, res) {
  userController.getUser(req, res);
});

// authenticates whether the email matches the password. Does not set a session or cookie in its current implementation
router.post("/loginUser", function (req, res) {
  userController.loginUser(req, res);
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
// updates and overwrites single user's username
router.put("/user/:id/updateUsername", (req, res) => {
  const id = req.params.id;
  const username = req.query.username;
  userController.updateUserUsername(req, res, id, username);
});
// updates and overwrites single user's username
router.put("/user/:id/updateEmail", (req, res) => {
  const id = req.params.id;
  const email = req.query.email;
  userController.updateUserEmail(req, res, id, email);
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
router.put("/user/:id/setSharedNote", (req, res) => {
  const id = req.params.id;
  const classId = req.query.classId;
  const noteId = req.query.noteId;
  userController.setSharedNote(req, res, id, classId, noteId);
});
router.put("/note/:noteId/addSharedUser", (req, res) => {
  const newEmail = req.query.newEmail;
  const noteId = req.params.noteId;
  userController.addSharedUser(req, res, noteId, newEmail);
});
router.get("/user/:id/retrieveSharedNotes", (req, res) => {
  const id = req.params.id;
  userController.retrieveSharedNotes(req, res, id);
});
router.post("/user/getUserFromEmail", (req, res) => {
  userController.getUserFromEmail(req, res);
});

router.post("/user/:id/addTask", (req, res) => {
  const id = req.params.id;
  userController.addTask(req, res, id);
});

router.get("/user/:id/getTasks", (req, res) => {
  const id = req.params.id;
  userController.getTasks(req, res, id);
});

router.post("/user/:id/saveTasks", (req, res) => {
  const id = req.params.id;
  const tasks = req.body;
  userController.saveTasks(req, res, id, tasks);
});

router.delete("/user/:id/deleteTask", (req, res) => {
  const id = req.params.id;
  const taskId = req.query.taskId;
  userController.deleteTask(req, res, id, taskId);
});

router.delete("/note/:noteId/removeSharedUser", (req, res) => {
  const noteId = req.params.noteId;
  const id = req.query.id;
  userController.deleteSharedUser(req, res, id, noteId);
});

//router command for deleting user
router.delete("/user/:id/deleteUserAccount", (req, res) => {
  const id = req.params.id;
  userController.deleteUserAccount(req, res, id);
});


module.exports = router;
