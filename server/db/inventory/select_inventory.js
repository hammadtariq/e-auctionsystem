module.exports = function(app) {
    /**
     * Select Inventory Function
     * @params id(user id)
     * */
    app.query.selectInventory = function (id, Q) {
        var deferred = Q.defer();
        var selectQuery = "SELECT * FROM `inventories` WHERE user_id = '" + id + "' ";
        app.db.connection.query(selectQuery, function (err, row) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(row);
            }
        });
        return deferred.promise;
    }
};