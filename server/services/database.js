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
    return db.ref("/users/" + uid);
  },
};
