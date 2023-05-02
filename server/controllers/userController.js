const bcrypt = require("bcrypt");
const database = require("../services/database");

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
    try {
      // get user by email
      var uid, user;
      const email = req.body.email
      try {
        user = await database.getUserFromEmail(email)
        uid = user.uid
      } catch (e) {
        res.status(400).send('No user found')
        console.error(e)
      }
      
      await database.writeSessionData(req.sessionID, user)
      .then(() => {
        console.log(user)
        res.status(200).json(user)
      })
      .catch(error => {
        res.status(400).send(error)
      })
    } catch(e) {
      console.error(e)
    }
     
  },

  getUserFromCookie: async function(req, res) {
    try {
      const user = await database.getUserBySession(req.sessionID);
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error. (user may not be logged in)');
    }
  }
};