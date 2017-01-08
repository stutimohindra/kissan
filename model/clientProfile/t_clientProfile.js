'use strict';
var mysql = require('mysql');
var dbUtils = require('../dbUtils')
var client = {

    getUserId: function (options,cb) {
        var query = "select id,noOfInstalments,installmentAmount from t_clientProfile where firstName='"+options.firstName+"' and " +
            "lastName='"+options.lastName+"' and phone_no="+options.phone_no
        dbUtils.executeQuery(query,function (error,result) {
            if(error){
                cb(error || new Error('error while fetching ids'))
            }else if(!error && result){
                cb(null,result)
            }
        })
    }

}
module.exports = client
