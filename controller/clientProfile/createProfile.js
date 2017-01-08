'use strict';
var dbUtils = require('../../model/dbUtils');
var moment = require('moment');
var create = {
    createProfile:function (req,res,next) {
        var options = {
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            address:req.body.address,
            phone_no:req.body.phone_no,
            noOfInstallments:req.body.noOfInstallments,
            loanAmount:req.body.loanAmount,
            scheme:req.body.scheme,
            rate:req.body.rate,
            time:req.body.time,
            installmentAmount:req.body.installmentAmount
        }
        if(options.address == '') {
            var response ={
                error: -1,
                message: 'empty data : no address'
            };
            res.json(response);
        }else if(options.firstName == '' ){
            var response ={
                error: -1,
                message: 'empty data : no firstName'
            };
            res.json(response);
        }else if(options.lastName == ''){
            var response ={
                error: -1,
                message: 'empty data : no lastName'
            };
            res.json(response);
        }else if(options.phone_no == '' ){
            var response ={
                error: -1,
                message: 'empty data : no phone_no'
            };
            res.json(response);
        }else if(options.noOfInstallments){
            var response ={
                error: -1,
                message: 'empty data : no noOfInstallments'
            };
            res.json(response);
        }else if(options.loanAmount == ''){
            var response ={
                error: -1,
                message: 'empty data : no loanAmount'
            };
            res.json(response);
        }else if(options.installmentAmount == '') {
            var response ={
                error: -1,
                message: 'empty data : no installmentAmount'
            };
            res.json(response);
        }else if(options.rate == ''){
            var response ={
                error: -1,
                message: 'empty data : no rate'
            };
            res.json(response);
        }else if(options.scheme == ''){
            var response ={
                error: -1,
                message: 'empty data : no scheme'
            };
            res.json(response);
        }

        var date = moment(new Date()).format('YYYY-DD-MM HH:mm:ss')
        var data =[];
        var dataToInsert = []
        dataToInsert.push(options.firstName)
        dataToInsert.push(options.lastName)
        dataToInsert.push(options.address)
        dataToInsert.push(options.phone_no)
        dataToInsert.push(options.noOfInstallments)
        dataToInsert.push(options.loanAmount)
        dataToInsert.push(options.scheme)
        dataToInsert.push(options.rate)
        dataToInsert.push(options.time)
        dataToInsert.push(options.installmentAmount)
        dataToInsert.push(date)
        dataToInsert.push(date)
        data.push(dataToInsert)
        var query = 'INSERT INTO t_clientProfile' +
            '(FirstName,LastName,address,phone_no,noOfInstalments,loan,scheme,rateOfInterest,time,installmentAmount,created_at,updated_at)' +
            ' VALUES ?';
        dbUtils.doBulkInsertion(query, data, function (err, result) {
            if (!err && result) {

                var resposne = {
                    error: 0,
                    message: 'Successfully inserted',
                    insertId: result.insertId
                };
                var SI ;
                if(options.scheme == 'daily'){
                  SI = (options.loanAmount * options.rate * options.time)/(100*365)
                }else if(options.scheme == 'weekly'){
                  SI = (options.loanAmount * options.rate * options.time)/(100*52)
                }else if(options.scheme == 'monthlyROI'){
                    SI = (options.loanAmount * options.rate * options.time)/(100*12)
                }else if(options.scheme == 'monthly'){
                    SI = (options.loanAmount * options.rate * options.time)/(100*12)
                }else if(options.scheme == 'fortnight'){
                    SI = (options.loanAmount * options.rate * options.time)/(100*26)
                }
                resposne.SimpleInterest = SI
                resposne.loan = loan
                res.json(resposne);
            } else {
                var resposne = {
                    error: -1,
                    message: 'failure'
                };
                res.json(resposne);
            }
        });
    }
}
module.exports = create
if(require.main === module){
   create.createProfile()
}