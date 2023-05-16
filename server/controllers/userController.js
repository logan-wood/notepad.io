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

  getInfo: function (req, res, uid) {
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
   * 
   */
  addNewUser: async function (req, res) {
    const displayName = req.body.displayName
    const email = req.body.email
    const password = req.body.password

    // check if user exists
    if (await database.getUserFromEmail(email) != null) {
      res.status(409).json({ message: "Email already in use" });
      return
    }

    // hash password
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) throw new Error("Internal Server Error");

      // 'User' to be decalred
      // Create new user object
      let user = {
        username: displayName,
        email: email,
        password: hash,
      };
      
      // Save new user to database
      database.writeUserData(user)
      .then((result) => {
        console.log(result)
        res.status(201).send('user added to database')
      })
    });
  },

  loginUser: async function (req, res) {
    var user;
    const email = req.body.email
    const password = req.body.password

    // get uid from email
    try {
      user = await database.getUserFromEmail(email)
    } catch (e) {
      res.status(400).send('No user found')
      return
    }

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        // add user data to req.session object

        // send response
        res.status(200).json(user)
      } else {
        res.status(401).send('Invalid password')
      }
    } else {
      res.status(404).send('No user found')
    }
  },

  getUserFromEmail: async function (email) {
    const ref = db.ref("/users/");
    const snapshot = await ref.once("value");

    let userData = null;
    snapshot.forEach((userSnapshot) => {
      const user = userSnapshot.val();
      if (user.email === email) {
        userData = user;
      }
    });

  return userData;
  },

  updateClass: function (req, res, uid) {
    console.log("calling database");
    const classToUpdate = req.body;
    if (uid && classToUpdate) {
      try {
        database.updateClass(uid, classToUpdate);
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
