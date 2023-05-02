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
  writeSessionData: async function (sessionID, user) {
    try {
      // get uid from email
      const uid = user.uid

      const ref = db.ref("/sessions/" + sessionID);
      ref.set({
        sessionID: sessionID,
        uid: uid
      }, (error) => {
        if (error) {
          console.error(error)
        }
      })
    } catch (e) {
      // no record found
      console.log('Error writing session data: uid does not exist')
    }
  },
  getUserBySession: async function (sessionID) {
    const ref = db.ref("/sessions/" + sessionID)
    const snapshot = await ref.once("value")
    const uid = snapshot.val().uid
    const userData = await this.getUserData(uid);
    
    return userData;
  }
};
