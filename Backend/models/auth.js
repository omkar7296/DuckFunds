const db = require('../models/dbConnection');


module.exports.login = (callback) => {
console.log("inside model ");
db.mongoDb((err,result)=>{
    if(err){
        return callback("error connecting to mongodb",null)
    } else{
        console.log(db)
        return callback(null,"successfull")
    }
})
}