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

  loginUser: function (req, res) {
    // get user by uid
    const uid = req.body.uid

    // update session object (in memory)
    req.session.user = uid;

    // create new database session
    database.createSession(req.sessionID, req.session.user)

    // send confirmation to client
    res.status(200).send("Session stored")   
  },

  getUserFromCookie: async function(req, res) {
    try {
      const user = await database.getUserBySession(req.sessionID);
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }
};
