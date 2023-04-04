import db from "firebase.js";
import { ref, set } from "firebase-admin/database";

modules.exports = {
  writeUserData: function (uid, displayName, email, classes) {
    set(ref(db, "users/" + uid), {
      username: displayName,
      email: email,
      classes: classes,
    });
  },
};
