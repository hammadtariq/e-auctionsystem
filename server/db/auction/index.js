module.exports = function(app){

    require('./start_auction')(app);
    require('./update_auction')(app);
};