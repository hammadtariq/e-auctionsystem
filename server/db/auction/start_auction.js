module.exports = function (app) {
    /**
     * start Auction Function
     * @params user_id
     * @params min_bid_value
     * @params auc_status
     * @params item_id
     * @params item_quantity
     * @params item_img
     * */
    app.query.startAuction = function (data, Q) {
        var deferred = Q.defer();
        console.log('from query', data);
        var insertQuery = "INSERT INTO `auctions` (auc_id, user_id, start_time, min_bid_value, auc_status, item_id, item_quantity, item_img) " +
            "values ( REPLACE(UUID(), '-',''),'" + data.user_id + "',now(), '" + data.bidValue + "', 1,'" + data.inv_id + "', '" + data.quantity + "', '" + data.image_url + "');";
        app.db.connection.query(insertQuery, function (err, row) {
            if (err) {
                console.log('in err: ', err);
                deferred.reject(err);
            } else {
                console.log("in success startAuction");
                deferred.resolve(row);
            }
        });
        return deferred.promise;
    };
};