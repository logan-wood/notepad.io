const express = require("express");
const router = express.Router();
const cors = require("cors");

const corsOptions = {
    origin: "http://localhost:1234",
};

router.use(cors(corsOptions));

let userID = null;
router.post('/api/data', (req, res) => {
    userID = req.body.userUID;
    console.log('global var: ' + userID);
    res.json({ userID });
});

router.get('/api/userID', (req, res) => {
    res.json({ userID }); // Send the userID as a response
});

module.exports = router
