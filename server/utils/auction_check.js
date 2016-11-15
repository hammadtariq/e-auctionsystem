module.exports = function (app, Q) {

    app.utils.auctionCheck = function () {
        var deferred = Q.defer();
        var data = {};
        data['bids_arr'] = app.get('bids_arr');
        data['status'] = app.get('auctionStatus');
        deferred.resolve(data);
        return deferred.promise;
    }

};