const session = require("express-session");
const firebase = require("./firebase");
const db = firebase.db();

module.exports = {
  writeUserData: async function (user) {
    // check UID is not being used
    var randNum
    do {
      var randNum = Math.floor(Math.random() * 9000000000) + 1000000000;
      var matchFound = false
      await this.getUserData(randNum)
      .then((res) => {
        if (res) {
          matchFound = true
        }
      })
    } while (matchFound = true)
    
    // insert into DB
    const uid = randNum
    set(ref(db, "users/" + uid), {
      uid: uid,
      username: user.username,
      email: user.email,
      password: user.password,
      classes: '',
    });
    return "User successfully";
  },

  getUserData: function (uid) {
    const ref = db.ref("/users/" + uid);
    return ref.once("value")
    .then(snapshot => {
      const data = snapshot.val();
      return data;
    });
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

  deleteSessionData: async function (sessionID) {
    const ref = db.ref("/sessions/" + sessionID)

    ref.remove()
    .catch((error) => {
      console.error(error)
    })
  },

  getUserBySession: async function (sessionID) {
    console.log('querying the following sessionID: ' + sessionID)
    const ref = db.ref("/sessions/" + sessionID)
    const snapshot = await ref.once("value")
    console.log(snapshot.val())
    const uid = snapshot.val().uid
    const userData = await this.getUserData(uid);
    
    return userData;
  },
  
  //adds new user if uid doesn't exist, otherwise updates class (overwrites if exists; creates if doesn't exist already).
  updateClass: async function (uid, classToUpdate) {
    const ref = db.ref("/users/" + uid).child(classToUpdate.id);
    const snapshot = await db.ref("/users/" + uid).once("value");
    if (!snapshot.exists()) {
      console.log("user doesn't exist - creating new user!");
      this.addNewUser(uid);
      await ref.update(classToUpdate);
      return ref;
    } else {
      await ref.update(classToUpdate);
      return ref;
    }
  },
};
