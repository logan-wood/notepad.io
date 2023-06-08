const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 1234;

require('dotenv').config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(cors());

// Serve static files (e.g., JS, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Serve the game HTML file
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//initiate router
const router = require("./public/gameRoutes/gameRouter");
app.use(router);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
