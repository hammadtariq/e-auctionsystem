module.exports = function (app) {

    /**
     * Update User Function
     * @params id(user id),status(login status)
     * */

    app.query.updateUser = function (id, status, Q) {
        var deferred = Q.defer();
        var updateQuery = "UPDATE `users` SET status = '" + status + "' WHERE uid = '" + id + "'";
        app.db.connection.query(updateQuery, function (err, result) {
            if (err) {
                console.log("update error: ", err);
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });
        return deferred.promise
    };
};