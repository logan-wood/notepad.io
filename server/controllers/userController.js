const bcrypt = require("bcrypt");
const database = require("../services/database");

// functions
module.exports = {
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
    const displayName = req.body.displayName;
    const email = req.body.email;
    const password = req.body.password;

    // check if user exists
    if ((await database.getUserFromEmail(email)) != null) {
      res.status(409).json({ message: "Email already in use" });
      return;
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
      console.log("calling write function...");
      database
        .writeUserData(user)
        .then((result) => {
          console.log(result);
          res.status(201).send("user added to database");
        })
        .catch((error) => {
          console.log(error);
          res.status(400).send("Could not write user to database");
        });
    });
  },

  loginUser: async function (req, res) {
    var user;
    const email = req.body.email;
    const password = req.body.password;

    // get uid from email
    try {
      user = await database.getUserFromEmail(email);
    } catch (e) {
      res.status(400).send("No user found");
      return;
    }

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        // add user data to req.session object

        // send response
        res.status(200).json(user);
      } else {
        res.status(401).send("Invalid password");
      }
    } else {
      res.status(404).send("No user found");
    }
  },

  getUserFromEmail: async function (req, res) {
    const email = req.body.email;

    const userData = await database.getUserFromEmail(email);

    if (userData != null) {
      res.status(200).json(userData);
    } else {
      res.status(404).send("user not found");
    }

    return userData;
  },

  updateUserUsername: async function (req, res, id, newUsername) {
    try {
      // Update the user's username
       const userData = await database.updateUserUsername(id, newUsername);

      // Return success message
       return res.status(200).json(userData);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
    
  },

  updateUserEmail: async function (req, res, id, newEmail) {
    try {
      // Check if email is already in use by another user
      const existingUser = await database.getUserFromEmail(newEmail);
      if (existingUser && existingUser.uid !== id) {
        return res
          .status(400)
          .json({ error: "Email is already in use by another user" });
      }

      // Update the user's email
      await database.updateUserEmail(id, newEmail);

      // Return success message
      return res.status(200).json(userData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  updateClass: function (req, res, uid) {
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
  setSharedNote: function (req, res, uid, classId, noteId) {
    if (uid && classId && noteId) {
      try {
        database.setSharedNote(uid, classId, noteId);
        res.status(200).send("Request successfully sent!");
      } catch (error) {
        console.log(error);
        res.status(500).send("Error setting note as shared: " + error.message);
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

  addSharedUser: async function (req, res, noteId, newEmail) {
    if ((noteId, newEmail)) {
      try {
        var uid, username;
        // get uid from email
        await database.getUserFromEmail(newEmail).then((user) => {
          uid = user.uid;
          username = user.username;
        });

        database.addSharedUser(noteId, uid, username);
        res.status(200).send("Request successfully sent!");
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .send("Error adding shared user to note: " + error.message);
      }
    } else {
      if (!noteId && !newEmail) {
        res
          .status(400)
          .send(
            "Bad Request: uid parameter is missing; classId & noteId both not found."
          );
      }
      if (!noteId) {
        res.status(404).send("Bad Request: noteId not found.");
      }
      if (!newEmail) {
        res
          .status(400)
          .send(
            "Bad Request: newEmail parameter is missing. The uid of the user you wish to share the note with is required."
          );
      }
    }
  },
  //for removing the user from the shared note
  removeSharedUser: function (req, res, uid, noteId) {
    if (uid && noteId) {
      try {
        database.removeSharedUser(uid, classId);
        res.status(200).send("Request successfully sent!");
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .send("Error removing User from sharedNote: " + error.message);
      }
    } else {
      if (!classId && !uid) {
        res
          .status(400)
          .send("Bad Request: uid parameter is missing; UserId not found.");
      }
      if (!classId) {
        res.status(404).send("Bad Request: user not found.");
      }
      if (!uid) {
        res.status(400).send("Bad Request: uid parameter is missing.");
      }
    }
  },
  retrieveSharedNotes: function (req, res, uid) {
    if (uid) {
      try {
        database.retrieveSharedNotes(uid).then((data) => {
          res.status(200).send(data);
        });
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .send("Error removing note from database: " + error.message);
      }
    } else {
      if (!uid) {
        res.status(400).send("Bad Request: uid is missing from request.");
      }
    }
  },

  addTask: function (req, res, uid) {
    const task = req.body;

    if (uid && task) {
      try {
        database.addTask(uid, task);
        res.send(JSON.stringify("Success"));
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .send("Error removing note from database: " + error.message);
      }
    } else {
      if (!uid && !task) {
        res
          .status(400)
          .send(
            "Bad request: uid parameter is missing and task is missing from request body"
          );
      }
      if (!uid) {
        res.status(400).send("Bad Request: uid parameter is missing.");
      }
      if (!task) {
        res.status(400).send("Bad Request: task is missing from request body.");
      }
    }
  },

  getTasks: function (req, res, uid) {
    if (uid) {
      try {
        database
          .getTasks(uid)
          .then((data) => {
            res.send(data);
          })
          .catch((error) => {
            console.error("Error retrieving data from database:", error);
          });
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .send("Error removing note from database: " + error.message);
      }
    } else {
      res.status(400).send("Bad Request: uid parameter is missing.");
    }
  },
  saveTasks: function (req, res, uid, tasks) {
    if (uid && tasks) {
      try {
        database.saveTasks(uid, tasks);
        res.send(JSON.stringify("Success"));
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .send("Error removing note from database: " + error.message);
      }
    } else {
      if (!uid && !tasks) {
        res
          .status(400)
          .send(
            "Bad request: uid parameter is missing and task is missing from request body"
          );
      }
      if (!uid) {
        res.status(400).send("Bad Request: uid parameter is missing.");
      }
      if (!tasks) {
        res.status(400).send("Bad Request: task is missing from request body.");
      }
    }
  },

  deleteTask: function (req, res, uid, taskId) {
    if (uid && taskId) {
      try {
        database.deleteTask(uid, taskId);
        res.send(JSON.stringify("Success"));
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .send("Error removing note from database: " + error.message);
      }
    } else {
      if (!uid && !taskId) {
        res
          .status(400)
          .send(
            "Bad request: uid parameter is missing and task parameter is also missing"
          );
      }
      if (!uid) {
        res.status(400).send("Bad Request: uid parameter is missing.");
      }
      if (!taskId) {
        res.status(400).send("Bad Request: taskId parameter is missing.");
      }
    }
  },

  deleteUserAccount: function (req, res, uid) {
    if (uid) {
      try {
        database.deleteUser(uid);
        res.send(JSON.stringify("Success"));
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .send("Error removing User from database: " + error.message);
      }
    } else {
      if (!uid) {
        res.status(400).send("Bad Request: uid parameter is missing.");
      }
    }
  },
};
