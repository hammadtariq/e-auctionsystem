module.exports = function (app, Q) {

    app.utils.auction_winner = function (io) {
        var winner = app.get('bids_arr');
        var item = app.get('auctionStatus');
        app.set('bids_arr', []);
        app.set('auctionStatus', false);
        winner.length ? winner[0].status = true : winner.push({status: false});
        winner = winner[0];
        app.query.updateAuction({winner: winner, item: item}, Q)
            .then(function (result) {
                io.emit('auction_winner', winner);
            }, function (err) {
                console.log('error while updating the auction status');
            });
    }
}