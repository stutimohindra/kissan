'use strict';
var mysql = require('mysql');
var dbUtils = require('../dbUtils')

var payment = {
    getId:function (options,cb) {
       var query = "select * from t_payment where id ="+options.id;
        dbUtils.executeQuery(query,function (error,result) {
            if(error){
                cb(error || new Error('error while fetching ids'))
            }else if(!error && result){
                cb(null,result)
            }
        })
    }
}
module.exports = payment