module.exports = function (app) {

    app.get('/', function (req, res) {
            res.sendFile('index.html');
    });

    app.post('/api/authenticate', app.api.authenticate);
    app.get('/api/record:id', app.api.getRecord);
    app.put('/api/logout',app.api.logout);
    app.post('/api/getuser',app.api.getUser);
    app.post('/api/getInventory',app.api.getInventory);

};