module.exports = function(app){
    require('./select_inventory')(app);
    require('./insert_inventory')(app);
    require('./update_inventory')(app);
};