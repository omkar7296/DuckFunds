const db = require('../models/dbConnection');
const md5 = require('md5');


module.exports.gethome = (data, cb) => {
    let {
        emailId
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

            getUserHome(emailId,result)
            .then((output) => {
                let obj = {
                    code: 200,
                    message: "success",
                    data: output
                }
                return cb(null,obj);
            })
            .catch((reason) => {
                switch (reason) {
                    case 'failed_getUserHome':
                        let obj1 = {
                              message:"failed_getUserHome",
                              code:500
                               } 
                        return cb(obj1, null)
                }
 
            })
        }
    })
}

function getUserHome(emailId,result) {
    return new Promise((resolve, reject) => {
        let user_id = md5(emailId);
        let year = new Date().getFullYear();
        let month = new Date().getMonth()+1; 
        let now = new Date();
        let current_day = new Date().getDate() 
        let days_in_month = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
        days_left = days_in_month - current_day;
   
        result.collection('wallet').findOne({user_id: user_id, year:year ,month:month})
        .then((res) => {
            if (res == null) {
              let obj={
                  'email_id':emailId,
                  'user_id':user_id,
                  'totalSpent':0,
                  'totalAmount':0,
                  'balance':0,
                  'days_left':days_left,
                  'year':year,
                  'month':month,
                  'categories':[]
              }  
              return resolve(obj);
            } else {
                res.days_left=days_left;
                let totalAmount = 0;
                let totalSpent = 0; 
              if(res.categories.length>0){
                for(let i=0;i<res.categories.length;i++){
                    totalAmount=totalAmount+res.categories[i].total;
                    totalSpent=totalSpent+res.categories[i].spent;
                  }
              }  
            
              res.totalAmount=totalAmount;
              res.totalSpent=totalSpent;
              res.balance=totalAmount-totalSpent;
              return resolve(res);  
            }
        })
        .catch((err) => {
            return reject('failed_getUserHome');
        })


    })
}


