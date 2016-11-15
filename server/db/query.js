module.exports = function (app) {
    /**
     * General Query Function
     * @params data(query statement)
     * */
     app.query.genericQuery = function (data, Q) {
        var deferred = Q.defer();
        app.db.connection.query(data, function (err, row) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(row);
            }
        });
        return deferred.promise;
    };
    
};
