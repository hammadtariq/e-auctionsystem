module.exports = function(app, mysql){
		require('./config')(app);
		require('./mysql')(app, mysql);
};