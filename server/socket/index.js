var Q = require('q');
function connect(app, io) {
    app.socket = {};
    app.set('bids_arr',[]);
    app.set('auctionStatus',false);
    io.on('connection', function (socket) {
        console.log(" User connected!");
        app.socket = socket;
        app.socket.on('login', function (username) {
            socket.username = username;
        });
        app.socket.on('auction', function (auction) {
            if(app.get('auctionStatus')){
                io.emit('check_auction',{status:true})
            }
            else{
                app.set('countDown', 90);
                app.set('auctionStatus',auction);
                app.utils.timer_start(io);
                app.query.startAuction(auction, Q)
                    .then(function (data) {
                        console.log("data", data);
                        io.emit('bid', {
                            status: true,
                            username: socket.username,
                            auction: auction
                        });
                        io.emit('my_bid', {
                            status: true,
                            auction: auction
                        });
                    }, function (error) {
                        console.log("error", error);
                        io.emit('my_bid', {
                            status: false,
                            error: error
                        });
                    }); 
            }
            
        });
        app.socket.on('do_bid', function (bid) {
            app.get('countDown') < 10 && (app.set('countDown',app.get('countDown')+10))
            var current_bid = app.get('bids_arr');
            current_bid.unshift(bid)
            app.set('bids_arr',current_bid)
            io.emit('bid_rcv', app.get('bids_arr'))
        });

        app.socket.on('winner',function(data){
            console.log('auction winner: ',data);
        });
        app.socket.on('auction_status',function(data){
            app.utils.auctionCheck()
                .then(function (data) {
                    io.emit('res_auction_status', data);
                }, function (error) {

                })
        })
        
    });
}

exports.connect = connect;