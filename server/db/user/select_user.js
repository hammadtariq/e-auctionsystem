module.exports = function(app) {
    /**
     * Select User Function
     *  @params username
     * */
    app.query.selectUser = function (username, Q) {
        var deferred = Q.defer();
        var credentials = username.id ? '`uid` =' + "'" + username.id + "'" : '`userName` =' + "'" + username + "'";
        var selectQuery = "SELECT * FROM `Users` WHERE " + credentials;
        app.db.connection.query(selectQuery, function (err, row) {
            if (err) {
                console.log(" select error: ", err);
                deferred.reject(err);
            } else {
                deferred.resolve(row);
            }
        });
        return deferred.promise
    };
};