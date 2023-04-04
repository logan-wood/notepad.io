const admin = require("firebase-admin");
const serviceAccount = require("./firebaseServiceAccountKey.json");

module.exports = {
  getApp: function () {
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://notepad-io-database-default-rtdb.firebaseio.com",
    });
  },

  db: function () {
    return this.getApp().database();
  },
};
