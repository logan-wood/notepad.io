const firebase = require("./firebase");
const db = firebase.db();

module.exports = {
  addNewUser: async function (uid) {
    await db.ref("users/" + uid).set({
      creationDate: new Date().toISOString(),
    });
    return "Success";
  },
  getUserData: async function (uid) {
    const ref = db.ref("/users/" + uid);
    return await ref.once("value", (snapshot) => {
      const data = snapshot.val();
      return data;
    });
  },
  updateClassNote: async function (uid, classToUpdate) {
    const ref = db.ref("/users/" + uid).child(classToUpdate.id);
    await ref.update(classToUpdate);
    return ref;
  },
  getAllClassNotes: async function (uid) {
    const ref = db.ref("/users/" + uid);
    const snapshot = await ref.once("value");
    const data = snapshot.val();
    return data;
  },
};
