const session = require("express-session");
const firebase = require("./firebase");
const db = firebase.db();

module.exports = {
  writeUserData: function (uid, displayName, email, classes) {
    set(ref(db, "users/" + uid), {
      username: displayName,
      email: email,
      classes: classes,
    });
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
  }
};
