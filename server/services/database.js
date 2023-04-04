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
    return ref.once("value", (snapshot) => {
      const data = snapshot.val();
      return data;
    });
  },
};
