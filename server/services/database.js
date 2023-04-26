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
  createSession: function (sessionID, email) {
    // alter this to store the email, will need to write a function to get userID by email
    const ref = db.ref("/sessions/" + sessionID);
    ref.set({
      sessionID: sessionID,
      email: email
    }, (error) => {
      if (error) {
        console.error(error)
      }  else {
        console.log('update complete')
      }
    })
  },
  getUserBySession: async function (sessionID) {
    const ref = db.ref("/sessions/" + sessionID)
    return ref.once("value")
    .then(snapshot => {
      // get user by UID (this will need to be more fleshed out before being incorporated)
      // const uid = JSON.parse(snapshot.val().sess).user
      // const userData = this.getUserData(uid).then((result) => {console.log(result)});
      
      const data = snapshot.val();
      return JSON.parse(data.sess);
    })
  }
};
