const admin = require("firebase-admin");
const serviceAccount = require("./firebaseServiceAccountKey.json");

// initialising app outside of function, to avoid this code running multiple times, and creating duplicate apps
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://notepad-io-database-default-rtdb.firebaseio.com",
})

module.exports = {
  getApp: function () {
    return app;
  },
  getStore: function() {
      return {
          database: this.db(),
          collection: 'sessions',
          expiration: 86400000
      }
  },
  db: function () {
    return this.getApp().database();
  }
};
