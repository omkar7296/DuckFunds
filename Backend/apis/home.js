
let home = require('../models/home');


function gethome(req, res) {

    let {
        emailId
    } = req.body;


    home.gethome({emailId}, (err, result) => {
        if (err) {
           res.json(err);
         //   return res.sendJson(err);
        } else {
      
           res.json(result);
         //   return res.sendJson(result);
        }
    });
}



module.exports.gethome = gethome




