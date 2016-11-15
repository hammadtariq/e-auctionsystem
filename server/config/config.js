module.exports = function (app) {
    var config = {
        production: {
            mysql: {
                host: '127.0.0.1',
                user: 'root',
                password: '',
                database: 'auction',
                port: '3306'
            }
        },
        development: {
            mysql: {
                host: '127.0.0.1',
                user: 'root',
                password: '',
                database: 'auction',
                port: '3306'
            }
        }
    };
    //process.env.NODE_ENV = process.env.NODE_ENV || "production";
    process.env.NODE_ENV = process.env.NODE_ENV || "development";
    console.log("Node Environment = " + process.env.NODE_ENV);

    app.config = config[process.env.NODE_ENV];
    app.session = {};
};