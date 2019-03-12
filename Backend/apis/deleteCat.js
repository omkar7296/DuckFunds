
let deleteCat = require('../models/deleteCat');

function deleteone(req, res) {

    deleteCat.deleteone(req.body, (err, result) => {
        if (err) {
           res.json(err);
        } else {
           res.json(result);
        }
    });
}

module.exports.deleteone = deleteone

