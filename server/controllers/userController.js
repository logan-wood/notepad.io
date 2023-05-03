const bcrypt = require("bcrypt");
const database = require("../services/database");
const session = require("express-session");

// functions
module.exports = {
  /**
   * Adds a new user to the database, includes password hashing.
   * @param {String} displayName
   * @param {String} email
   * @param {String} password
   */
  addNewUser: function (displayName, email, password) {
    try {
      // check if user exists
      if (this.getUser(email) == null) {
        res.status(401).json({ message: "Email already in use" });
      }

      // hash password
      const saltRound = 10;

      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) throw new Error("Internal Server Error");

        // 'User' to be decalred
        // Create new user object
        let user = new User({
          displayName,
          email,
          password: hash,
        });

        // Save new user to database
      });
    } catch (err) {
      res.status(401).send(err.message);
    }
  },

  getUser: function (req, res) {
    console.log("calling database");
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

    // add user data to req.session object
    req.session.regenerate
    req.session.user = user
    console.log(req.session)
    console.log(req.sessionID)

    // set cookie
    res.cookie('mySessionID', req.sessionID, { httpOnly: true })

    // send response
    res.status(200).send(user)

  },

  getUserSession: async function(req, res) {
    if (req.session.user) {
      res.status(200).json(req.session)
    } else {
      res.status(400).send('no session found')
    }
  },

  logoutUser: async function(req, res) {
      console.log(req.cookies)
      // delete session from database
      if (req.session.user) {
        req.session.destroy()
        res.status(200).send('Successfully logged user out')
      } else {
        res.status(400).send('Unable to log user out')
      }
  },
};