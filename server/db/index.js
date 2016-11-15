module.exports = function(app){

    app.query = {};

    require('./auction')(app);
    require('./coins')(app);
    require('./inventory')(app);
    require('./query')(app);
    require('./user')(app);

};