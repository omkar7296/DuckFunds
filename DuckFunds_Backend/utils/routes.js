const express = require('express');
const router = express.Router();
const auth=require("../apis/auth");
console.log("inside routes");

router.post('/auth/login',auth.login) 

module.exports = router; 



