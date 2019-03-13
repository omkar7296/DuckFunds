const db = require('../models/dbConnection');
var uuid = require('uuid/v1');
const md5 = require('md5');


module.exports.addcategory = (data, cb) => {
    let {
        emailId,cat_name,cat_type,total
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
                return upsertNewCat(output,result);
              
            })
            .then((output) => {
                let obj = {
                    code: 200,
                    message: "new category added",
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
            emailId,cat_name,cat_type,total
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
            if (res == null) {
             let cat_id = uuid();
             cat_id = cat_id.split('-').join("");  
              let obj={
                  'email_id':emailId,
                  'user_id':user_id,
                  'totalSpent':0,
                  'totalAmount':total,
                  'balance':total,
                  'year':year,
                  'month':month,
                  'categories':[{'cat_name':cat_name,
                                 'cat_type':cat_type,
                                 'total':total,
                                 'spent':0,
                                 'balance':total,
                                 'cat_id':cat_id
                                }]
              }
              return resolve(obj); 

            } else {
              let totalAmount = 0;
              let totalSpent = 0; 
              let cat_id = uuid();
              cat_id = cat_id.split('-').join("");  
              let cat_obj={
                'cat_name':cat_name,
                'cat_type':cat_type,
                'total':total,
                'spent':0,
                'balance':total,
                'cat_id':cat_id
              } 
              res.categories.push(cat_obj);
              for(let i=0;i<res.categories.length;i++){
                totalAmount=totalAmount+res.categories[i].total;
                totalSpent=totalSpent+res.categories[i].spent;
              }
              res.totalAmount=totalAmount;
              res.totalSpent=totalSpent;
              res.balance=totalAmount-totalSpent;
              
              return resolve(res);  
            }
        })
        .catch((err) => {
            return reject('failed_createDoc');
        })


    })
}

function upsertNewCat(obj,result) {
    return new Promise((resolve, reject) => {
        let { user_id , year, month} = obj;
        result.collection('wallet').update({user_id: user_id, year:year, month:month}, {'$set':obj}, {upsert:true})
        .then((res)=>{
            return resolve({});
        })
        .catch((err)=>{
            return reject('failed_upsertNewCat');
        })
    })

}




