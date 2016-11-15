module.exports = function (app) {
    require('./select_user')(app);
    require('./insert_user')(app);
    require('./update_user')(app);
};