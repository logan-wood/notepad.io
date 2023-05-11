const express = require("express");
const app = express();
const path = require("path");

// get firebase services
const firebase = require('./services/firebase')

// body parser (for forms)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// environment variables
const dotenv = require("dotenv");
dotenv.config("./env");

// cors, which allows the server side to send data to the client
const cors = require('cors');
app.use(cors({
  origin: process.env.CLIENT_DOMAIN,
  credentials: true // allow cookies
}));

//cookies
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// session tracking
const session = require('express-session')
// firebase session storage
const FirebaseStore = require('connect-session-firebase')(session)
const storeOptions = firebase.getStore()

// express-session middleware using firebase for storage
app.use(session({
  store: new FirebaseStore(storeOptions),
  name: 'mySessionID',
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000000000,
    httpOnly: true,
    secure: false,
    path: '/',
    sameSite: 'none'
  },
  resave: false
}))

// initiate router
const router = require("./routes/router");
app.use(router);

app.listen(8080, function () {
  console.log("server listening on http://localhost:" + process.env.PORT);
});





