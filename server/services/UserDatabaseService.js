function writeUserData(db, uid, displayName, email, classes) {
  set(ref(db, "users/" + uid), {
    username: displayName,
    email: email,
    classes: classes,
  });
}
