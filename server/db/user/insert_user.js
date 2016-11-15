module.exports = function (app) {
    /**
     * Insert User Function
     * @params username
     * */

     app.query.insertUser = function (username, Q) {
        var deferred = Q.defer();
        var insertQuery = "INSERT INTO `users` (uid, userName, coins) values (REPLACE(UUID(), '-',''),'" + username + "',1000 );";
        app.db.connection.query(insertQuery, function (err, result) {
            if (err) {
                console.log("insert error: ", err);
                deferred.reject(err);
            } else {

                /**
                 * insert inventory items
                 * */
                app.query.insertInventory(username, Q)
                    .then(function (data) {
                        deferred.resolve(data);
                    }, function (error) {
                        deferred.reject(error);
                    });
            }
        });

        return deferred.promise
    };
};