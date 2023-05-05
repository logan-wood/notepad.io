const bcrypt = require("bcrypt");
const database = require("../services/database");
const session = require("express-session");

// functions
module.exports = {
  getUser: function (req, res) {
    console.log("calling database");
    const { uid } = req.query;
    if (uid) {
      database
        .getInfo(uid)
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

  /**
   * Adds a new user to the database, includes password hashing.
   * @param {String} displayName
   * @param {String} email
   * @param {String} password
   */
  addNewUser: async function (displayName, email, password) {
    try {
      // check if user exists
      if (await database.getUserFromEmail(email) == null) {
        res.status(401).json({ message: "Email already in use" });
      }

      // hash password
      const saltRound = 10;

      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) throw new Error("Internal Server Error");

        // 'User' to be decalred
        // Create new user object
        let user = {
          displayName: displayName,
          email: email,
          hash: hash,
        };

        // Save new user to database
        database.writeUserData(user)
      });
    } catch (err) {
      res.status(401).send(err.message);
    }
  },

  loginUser: async function (req, res) {
    var user;
    const email = req.body.email

    // get uid from email
    try {
      user = await database.getUserFromEmail(email)
    } catch (e) {
      res.status(400).send('No user found')
      console.error(e)
      return
    }

    if (user) {
      // add user data to req.session object
      req.session.user = user
      console.log(req.session)
      console.log(req.sessionID)

      // set cookie
      res.cookie('mySessionID', req.sessionID, { httpOnly: true })

      // send response
      res.status(200).json(user)
    } else {
      res.status(400).send('No user exists')
    }
  },

  removeClass: function (req, res, uid, classId) {
    if (uid && classId) {
      try {
        database.removeClass(uid, classId);
        res.status(200).send("Request successfully sent!");
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .send("Error removing class from database: " + error.message);
      }
    } else {
      if (!classId && !uid) {
        res
          .status(400)
          .send("Bad Request: uid parameter is missing; classId not found.");
      }
      if (!classId) {
        res.status(404).send("Bad Request: classId not found.");
      }
      if (!uid) {
        res.status(400).send("Bad Request: uid parameter is missing.");
      }
    }
  },
  removeNote: function (req, res, uid, classId, noteId) {
    if (uid && classId && noteId) {
      try {
        database.removeNote(uid, classId, noteId);
        res.status(200).send("Request successfully sent!");
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .send("Error removing note from database: " + error.message);
      }
    } else {
      if (!classId && !uid && !noteId) {
        res
          .status(400)
          .send(
            "Bad Request: uid parameter is missing; classId & noteId both not found."
          );
      }
      if (!classId) {
        res.status(404).send("Bad Request: classId not found.");
      }
      if (!noteId) {
        res.status(404).send("Bad Request: noteId not found.");
      }
      if (!uid) {
        res.status(400).send("Bad Request: uid parameter is missing.");
      }
    }
  },
};
