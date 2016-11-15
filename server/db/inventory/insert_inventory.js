module.exports = function (app) {
    /**
     * Insert Inventory Function
     * @params username
     * */

    app.query.insertInventory = function (username, Q) {
        var deferred = Q.defer();
        var insertQuery = "INSERT INTO inventories (inv_id, name, quantity, image_url, user_id) values " +
            "(REPLACE(UUID(), '-',''),'bread', 30, 'vendors/images/bread.png', (SELECT uid FROM users WHERE userName = '" + username + "' ))," +
            "(REPLACE(UUID(), '-',''),'carrot', 18, 'vendors/images/carrots.png', (SELECT uid FROM users WHERE userName = '" + username + "' ))," +
            "(REPLACE(UUID(), '-',''),'diamond', 1, 'vendors/images/diamond.png', (SELECT uid FROM users WHERE userName = '" + username + "' ));";
            
        app.db.connection.query(insertQuery, function (err, result) {
            if (err) {
                console.log("insert error: ", err);
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });
        return deferred.promise
    };
}