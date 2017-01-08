'use strict';

var config = {

    portHttp: process.env.PORT || 3000,
    portHttps: process.env.SPORT || 8443,
    offline_limit: 10,
    run_level: 1,
    timeout:60000,
    secret:"secret",
    db: [
        {   //production
            // host: '42.156.33.86',
            // port: '3306',
            // user: 'root',
            // password: 'wgCCDh4p',
            // database: 'MAHB'

            //local
            host: '127.0.0.1',
            port: '8889',
            user: 'root',
            password: 'root',
            database: 'Kissan'

        }
    ],
    //development
    kissan: [

          {
              host: 'http://localhost:3000'
          }
    ],

};
var env = process.env.NODE_ENV;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

if (env) {
    env = env.toLowerCase();
    switch (env) {
        case "development":
            config.run_level = 1;
            break;

    }
}
module.exports = config;
