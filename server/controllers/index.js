module.exports = function(app, Q){
    app.api = {};
    require('./authController')(app, Q);
    require('./logoutController')(app, Q);
    require('./userController')(app, Q);
    require('./inventoryController')(app, Q);
};