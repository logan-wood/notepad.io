const bcrypt = require("bcrypt");
const database = require("../services/database");

// functions
module.exports = {
  addNewUser: function (req, res) {
    const { uid } = req.query;
    if (uid) {
      database.addNewUser(uid);
      res.status(200).send("User successfully added!");
    } else {
      res.status(400).send("Bad Request: uid parameter is missing.");
    }
  },

  getUser: function (req, res) {
    const { uid } = req.query;
    if (uid) {
      database
        .getUserData(uid)
        .then((data) => {
          res.send(data);
        })
        .catch((error) => {
          console.error("Error retrieving data from database:", error);
        });
    } else {
      res.status(400).send("Bad Request: uid parameter is missing.");
    }
  },
  updateClassNote: function (req, res, uid) {
    console.log("calling database");
    const classToUpdate = req.body;
    if (uid && classToUpdate) {
      try {
        database.updateClassNote(uid, classToUpdate);
        res.status(200).send("Request successfully sent!");
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .send("Error saving class to database: " + error.message);
      }
    } else {
      if (!classToUpdate && !uid) {
        res
          .status(400)
          .send("Bad Request: uid parameter is missing; Classes not found.");
      }
      if (!classToUpdate) {
        res.status(404).send("Error: classes not found.");
      }
      if (!uid) {
        res.status(400).send("Bad Request: uid parameter is missing.");
      }
    }
  },
  getAllClassNotes: function (req, res, uid) {
    if (uid) {
      database
        .getAllClassNotes(uid)
        .then((data) => {
          res.send(data);
        })
        .catch((error) => {
          console.error("Error retrieving data from database:", error);
        });
    } else {
      res.status(400).send("Bad Request: uid parameter is missing.");
    }
  },
};
