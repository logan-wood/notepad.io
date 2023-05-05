const firebase = require("./firebase");
const db = firebase.db();

module.exports = {
  addNewUser: async function (uid) {
    await db.ref("users/" + uid).set({
      creationDate: new Date().toISOString(),
    });
    return "User successfully";
  },
  getInfo: async function (uid) {
    const ref = db.ref("/users/" + uid);
    return await ref.once("value", (snapshot) => {
      const data = snapshot.val();
      return data;
    });
  },
  //adds new user if uid doesn't exist, otherwise updates class (overwrites if exists; creates if doesn't exist already).
  updateClass: async function (uid, classToUpdate) {
    const ref = db.ref("/users/" + uid).child(classToUpdate.id);
    const snapshot = await db.ref("/users/" + uid).once("value");
    if (!snapshot.exists()) {
      console.log("user doesn't exist - creating new user!");
      this.addNewUser(uid);
      await ref.update(classToUpdate);
      return ref;
    } else {
      await ref.update(classToUpdate);
      return ref;
    }
  },
  removeClass: async function (uid, classId) {
    const ref = await db
      .ref("/users/" + uid)
      .child(classId)
      .once("value");
    if (!ref.exists()) {
      console.log("Class doesn't exist");
      return ref;
    } else {
      console.log("removing class");
      await db
        .ref("/users/" + uid)
        .child(classId)
        .remove();
      return ref;
    }
  },
};
