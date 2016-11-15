module.exports = function (app, mysql) {
    app.db = {};
    app.db.connection = mysql.createConnection(app.config.mysql);
    app.db.connection.connect(function (err, success) {
        if (err) {
            console.log("Error connecting database ... ", err);
        }
        else {
            console.log("Database is connected ... ");
        }
    });
};