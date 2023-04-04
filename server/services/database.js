import db from "../config/database";

modules.exports = {
  writeUserData: function (uid, displayName, email, classes) {
    set(ref(db, "users/" + uid), {
      username: displayName,
      email: email,
      classes: classes,
    });
  },
};
