const express = require('express');
const router = express.Router();
const auth=require("../apis/auth");
const home=require("../apis/home");
const add=require("../apis/add");
const deleteCat=require("../apis/deleteCat");


console.log("inside routes");

router.post('/auth/login',auth.login)
router.get('/home',home.gethome)
router.post('/add/category',add.addcategory)
router.post('/delete/category',deleteCat.deleteone)




module.exports = router; 



