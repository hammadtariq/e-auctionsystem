module.exports = function(app) {
    /**
     * Update Inventory Function
     * @params quantity(inventory quantity),
     * @params inv_id(inventory id),
     * @params name(inventory name)
     * */
    app.query.updateInventory = function (data, Q) {
        var deferred = Q.defer();
        var userQuery = "UPDATE `inventories` SET quantity=quantity-"+ data.item.quantity+" WHERE inv_id='"+data.item.inv_id+"' AND quantity > 0";
        var winnerQuery = "UPDATE `inventories` SET quantity=quantity+"+data.item.quantity +" WHERE name='"+data.item.name +"' AND user_id=(SELECT winner_id FROM `auctions` order by auc_Id desc limit 1);"
        var updateQuery = data.flag ? userQuery : winnerQuery;
        app.db.connection.query(updateQuery, function (err, result) {
            if (err) {
                console.log("update inventory error: ", err);
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });
        return deferred.promise
    };
};