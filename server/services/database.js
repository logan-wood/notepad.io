const firebase = require("./firebase");
const db = firebase.db();

module.exports = {
  addNewUser: function (uid) {
    db.ref("users/" + uid).set({
      creationDate: new Date().toISOString(),
    });
    return "Success";
  },
  getUserData: function (uid) {
    const ref = db.ref("/users/" + uid);
    return ref.once("value", (snapshot) => {
      const data = snapshot.val();
      return data;
    });
  },
  // updateClasses: function (uid, classes) {
  //   const ref = db.ref("/users/" + uid).child("classes");
  //   const updates = {};
  //   Object.keys(classes).forEach((key) => {
  //     updates[key] = classes.title;
  //   });
  //   ref.update(updates);
  //   return ref;
  // },
  updateClassNote: function (uid, classToUpdate) {
    const ref = db.ref("/users/" + uid).child("classes");
    console.log();
    const updates = {
      [classToUpdate.title]: {
        id: classToUpdate.id,
        content: classToUpdate.content,
      },
    };
    ref.update(updates);
    return ref;
  },
};
