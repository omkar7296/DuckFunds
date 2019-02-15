
module.exports.mongoDb = (callback) => {

    let hostname = "localhost";
    let port = 27017;
    let dbName = "duckfunds_db";
    const MongoClient = require('mongodb').MongoClient;
    const url = `mongodb://${hostname}:${port}`;
    var client;
    var db;

    MongoClient.connect(url, function (err, response) {
        if(err){
            console.log("mongo error", err);
            return callback(err,null)
        } else{
            client = response
            console.log("Connected successfully to MongoDb server");
            db = client.db(dbName);
            return callback(null,db)
        }
    
    });
}



