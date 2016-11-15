module.exports = function (app, Q) {


    app.utils.timer_start = function (io) {
        var time = setInterval(function () {
            io.emit('timer_return', app.get('countDown'));
            app.get('countDown') == 0 && (clearInterval(time), app.utils.auction_winner(io));
            var temp = app.get('countDown');
            temp--;
            app.set('countDown', temp);
        }, 1000)
    }
};