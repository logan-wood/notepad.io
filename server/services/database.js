const firebase = require("./firebase");
const db = firebase.db();

module.exports = {
  createUserData: function (uid, displayName, email, classes) {
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
  updateClasses: function (uid, classes) {
    const ref = db.ref("/users/" + uid).child("classes");
    const updates = {};
    Object.keys(classes).forEach((key) => {
      updates[key] = classes[key];
    });
    ref.update(updates);
    return ref;
  },
};
