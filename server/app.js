const express = require("express");
const app = express();
const path = require("path");

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

// session tracking
const session = require('express-session')
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  cookie: {
    maxAge: 3600000
  },
  resave: false
}))

// initiate router
const router = require("./routes/router");
app.use(router);

app.listen(8080, function () {
  console.log("server listening on http://localhost:" + process.env.PORT);
});
