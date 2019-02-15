
let auth = require('../models/auth');


function login(req, res) {
    console.log("inside apis login")

    auth.login((err, result) => {
        if (err) {
            let obj = {
                code: 400,
                message: err
            }
            res.json(obj);
        } else {
            let obj = {
                code: 200,
                message: "success",
                data: result
            }
            res.json(obj);
        }
    });
}



module.exports.login = login

