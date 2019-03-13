
let add = require('../models/add');

function addcategory(req, res) {

    add.addcategory(req.body, (err, result) => {
        if (err) {
           res.json(err);
        } else {
           res.json(result);
        }
    });
}

module.exports.addcategory = addcategory






