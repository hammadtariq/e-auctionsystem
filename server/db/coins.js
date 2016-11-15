module.exports = function (app) {
    app.query.updateCoins = function (data, Q) {
        var deferred = Q.defer();
        app.query.genericQuery('SELECT * FROM `auctions` ORDER BY auc_Id DESC LIMIT 1;', Q)
            .then(function (resp) {
                console.log("data.item.bidValue ", data.item.bidValue );
                console.log("data", data);
                var insertQuery = "UPDATE `users`"+
                " SET coins = CASE uid"+
                " WHEN '"+data.item.user_id +"' THEN coins+"+resp[0].win_bid_value+
                " WHEN '"+resp[0].winner_id +"' THEN coins-"+resp[0].win_bid_value+
                " END"+
                " WHERE uid IN ('"+data.item.user_id +"','"+resp[0].winner_id +"')";
                app.db.connection.query(insertQuery, function (err, result) {
                    if (err) {
                        console.log('error from update Coins', err);
                        deferred.reject(err);
                    } else {
                        deferred.resolve(result);
                    }
                });
            }, function (error) {
                console.log('err', error);
                deferred.reject(error);

            });
        return deferred.promise
    };
};