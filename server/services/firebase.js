const admin = require("firebase-admin");
const serviceAccount = require("path/to/serviceAccountKey.json");

modules.exports = {
  getApp: function () {
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://notepad-io-database-default-rtdb.firebaseio.com",
    });
  },

  db: function () {
    return getApp().database();
  },
};
