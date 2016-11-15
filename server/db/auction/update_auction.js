module.exports = function(app) {

    /**
     * Update Auction Function
     * @params win_bid_value
     * @params userName
     * */
    app.query.updateAuction = function (data, Q) {
        var deferred = Q.defer();
        var insertQuery = "UPDATE `auctions` SET auc_status=0, winner_id = 0, win_bid_value= 0"+
            " ,end_time = now() ORDER BY auc_Id DESC LIMIT 1";
        insertQuery = data.winner.status ?  "UPDATE `auctions` SET auc_status=0, winner_id = (SELECT uid FROM users WHERE userName = '" + data.winner.name + "'), win_bid_value= "+data.winner.placed_bid+
        " ,end_time = now() ORDER BY auc_Id DESC LIMIT 1" : insertQuery;

        app.db.connection.query(insertQuery, function (err, row) {
            if (err) {
                console.log("insert error: ", err);
                deferred.reject(err);
            } else {
                data.flag = true;
                if(!data.winner.status){
                   deferred.resolve('No bid placed');
                }else{
                     /**
                     * update user inventory
                     * */
                    app.query.updateInventory(data, Q)
                        .then(function (updateInventory1) {
                            data.flag = false;
                            /**
                             * update winner inventory
                             * */
                            app.query.updateInventory(data,Q)
                                .then(function(updateInventory2){
                                    console.log('completed secnd inventory update')
                                    app.query.updateCoins(data,Q)
                                    .then(function(resp){
                                        deferred.resolve(updateInventory2);
                                    },function(error){
                                        deferred.reject(error);
                                    })
                                },function(errRes){
                                    deferred.reject(errRes);
                                })
                        }, function (error) {
                            deferred.reject(error);
                        });
                  }
               
            }
        });
        return deferred.promise;
    };
};