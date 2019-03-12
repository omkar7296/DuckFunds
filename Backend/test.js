/*
let year = new Date().getFullYear();
let month = new Date().getMonth(); 
let now = new Date();
let current_day = new Date().getDate() 
let days_in_month = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
days_left = days_in_month - current_day;
 

console.log(year,month +1, days_left);
*/
let _ = require('lodash');

 let categories= [
            {
                "cat_name": "Food",
                "cat_type": 1,
                "total": 800,
                "spent": 0,
                "balance": 800,
                "cat_id": "13d97b80446011e98c14a5f5265a2e7d"
            },{
                "cat_name": "Fun",
                "cat_type": 2,
                "total": 500,
                "spent": 0,
                "balance": 500,
                "cat_id": "14d97b80446011e98c14a5f5265a2e7d"
            }
        ];

        categories = _.reject(categories, function(item) { return item.cat_id === "14d97b80446011e98c14a5f5265a2e7d"; });

        console.log(categories);