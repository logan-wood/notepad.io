// functions
module.exports = {
    addNewUser: function (req, res) {
        res.send(req.body)
    },

    getUser: function (req, res) {
        res.send(JSON.parse('{"user":"demo"}'))
    }
}


