const express = require("express");
const app = express();
const path = require("path");

// environment variables
const dotenv = require("dotenv");
dotenv.config("./env");

// body parser (for forms)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// cors, which allows the server side to send data to the client
const cors = require('cors');
app.use(cors({
  origin: process.env.CLIENT_DOMAIN,
  credentials: true // allow cookies
}));

// initiate router
const router = require("./routes/router");
app.use(router);

app.listen(process.env.PORT, function () {
  console.log("server listening on http://localhost:" + process.env.PORT);
});
