'use strict';
var um =require('../../model/clientProfile/t_clientProfile')
var bcrypt = require('bcrypt');
var config = require('../../config')
var jwt    = require('jsonwebtoken');

var auth = {

    tokenCheck: function (req,res,next) {

        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, config.secret, function(err, decoded) {
                if (err) {
                    var response = {
                        error: -1, message: 'Failed to authenticate token.'
                    }
                    res.json(response);
                } else {
                    // if everything is good, save to request for use in other routes



                    req.decoded = decoded;
                    next();
                }
            });

        } else {
            // if there is no token
            // return an error
            var response = {
                error: -1,
                message: 'No token provided.'
            }
            res.json(response);

        }
    },
    rememberme: function loginfn(req, res, next) {
        if ('on' === req.body.loggedIn) {
            res.cookie('loggedIn', req.body.email, {
                maxAge: 900000,
                httpOnly: true
            });
        } else {
            res.clearCookie('rememberme');
        }

        next();
    },

    restriction:function (req, res, next) {

        if (req.session.loggedIn) {
            // res.json(req.session)
            next();
        } else {
            var response = {
                error:"-1",
                message:"user not logged in redirect to login page"
            }
            res.json(response)
        }
    },

    // authenticate: function(req,res,next){
    //     um.authenticate(req.body.email_id, req.body.password,createSession);
    //     function createSession(err,user){
    //         if(!err && user.length > 0){
    //             bcrypt.compare(req.body.password,user[0].password, function(err, result) {
    //                 if(err){
    //                     var response = {
    //                         error:-1,
    //                         message:'error while comparing password'
    //                     }
    //                     req.session.loggedIn = false
    //                     req.session.save()
    //                     res.json(response)
    //
    //                 }else if(!err && result == true ){
    //                     req.user = user;
    //                     delete req.user.password; // delete the password from the session
    //                     req.session.userDetail = user;//refresh the session value
    //                     req.session.loggedIn = true;
    //                     //res.locals.user = user;
    //                     // expires in 24 hours
    //
    //                     var token = jwt.sign({user:user[0].id},config.secret,{expiresIn : '1d' } );
    //
    //                     var response = {
    //                         error:0,
    //                         message:'successfully matched email and password',
    //                         userId:user[0].id,
    //                         name: user[0].name,
    //                         email_id: user[0].email_id,
    //                         phone_no:user[0].phone_no,
    //                         is_admin: user[0].is_admin,
    //                         profile_pic:user[0].profile_pic,
    //                         token:token
    //                     }
    //                     req.session.save()
    //                     req.token = token
    //
    //                     res.json(response)
    //
    //
    //                 }else if(!err && result == false){
    //                     req.session.loggedIn = false
    //                     var response = {
    //                         error:-1,
    //                         message:'incorrect password'
    //                     }
    //                     req.session.save()
    //                     res.json(response)
    //
    //                 }
    //             });
    //         }else if(!err && user.length == 0){
    //             req.session.loggedIn = false
    //             var response = {
    //                 error:-1,
    //                 message:'incorrect email address'
    //             }
    //             req.session.save()
    //             res.json(response)
    //         }
    //     }
    //
    // }
}
module.exports = auth
if(require.main === module){

}
