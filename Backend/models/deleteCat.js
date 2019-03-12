const db = require('../models/dbConnection');
let _ = require('lodash');
var uuid = require('uuid/v1');
const md5 = require('md5');


module.exports.deleteone = (data, cb) => {
    let {
        emailId,cat_id
    } = data;

    emailId = emailId.toLowerCase();
    
    db.mongoDb((err,result)=>{
        if(err){
            let obj={
                message:"failed_mongodb_connection",
                code:500
            }
            return cb(obj,null)
        } else{

            createDoc(data,result)
            .then((output) => {
                return deleteCat(output,result);
              
            })
            .then((output) => {
                let obj = {
                    code: 200,
                    message: "category deleted",
                    data: output
                }
                return cb(null,obj);
            })
            .catch((reason) => {
                switch (reason) {
                    case 'failed_createDoc':
                    let obj1 = {
                          message:"failed_createDoc",
                          code:500
                           } 
                    return cb(obj1, null)
                    break;
                    case 'failed_upsertNewCat':
                        let obj2 = {
                              message:"failed_upsertNewCat",
                              code:500
                               } 
                    return cb(obj2, null)
                }
 
            })
        }
    })
}

function createDoc(data,result) {
    return new Promise((resolve, reject) => {
        let {
            emailId,cat_id
        } = data;
    
        emailId = emailId.toLowerCase();

        let user_id = md5(emailId);
        let year = new Date().getFullYear();
        let month = new Date().getMonth()+1; 
        let now = new Date();
        let current_day = new Date().getDate() 
        let days_in_month = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
        days_left = days_in_month - current_day;
       
   
        result.collection('wallet').findOne({user_id: user_id, year:year ,month:month})
        .then((res) => {
         
              let totalAmount = 0;
              let totalSpent = 0; 
    
              res.categories = _.reject(res.categories, function(item) { return item.cat_id === cat_id; });
              console.log("new_res",res);
              if(res.categories.length>0){
                for(let i=0;i<res.categories.length;i++){
                    totalAmount=totalAmount+res.categories[i].total;
                    totalSpent=totalSpent+res.categories[i].spent;
                  }
                  res.totalAmount=totalAmount;
                  res.totalSpent=totalSpent;
                  res.balance=totalAmount-totalSpent;   
              } else{
                  res.totalAmount=totalAmount;
                  res.totalSpent=totalSpent;
                  res.balance=totalAmount-totalSpent;
              }  
           
              return resolve(res);  
           
        })
        .catch((err) => {
            console.log(err);
            return reject('failed_createDoc');
        })


    })
}

function deleteCat(obj,result) {
    return new Promise((resolve, reject) => {
        let { user_id , year, month} = obj;
        result.collection('wallet').update({user_id: user_id, year:year, month:month}, {'$set':obj}, {upsert:true})
        .then((res)=>{
            return resolve({});
        })
        .catch((err)=>{
            return reject('failed_deleteCat');
        })
    })

}




