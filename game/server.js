const express = require('express');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 1234;

// Serve static files (e.g., JS, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Serve the game HTML file
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
