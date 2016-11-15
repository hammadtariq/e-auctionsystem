module.exports = function (app, Q) {
    /**
     * authenticate Function (If user data exists simply do login him otherwise create new account and do login)
     * @params username
     * */

     app.api.authenticate = function (req, res) {
        app.session = req.session;
        if (app.session.username == req.body.username) {
            res.send({status: false, message: 'already signin'});
        } else {
            console.log("req.body.username", req.body.username);
            app.query.selectUser(req.body.username, Q)
                .then(function (data) {
                    if (data.length === 0) {
                        app.query.insertUser(req.body.username, Q)
                            .then(function (result) {
                                console.log("new user session created", result);
                                app.query.selectUser(req.body.username, Q)
                                    .then(function (data) {
                                        if (data.length === 0) {
                                            res.send({status: false, message: 'something goes wrong'});
                                        } else {
                                            app.query.updateUser(data[0].uid, 1, Q)
                                                .then(function (update) {
                                                    app.session.username = req.body.username;
                                                    app.socket.username = req.body.username;
                                                    res.send({status: true, data: data});
                                                }, function (error) {
                                                    res.send({status: false, error: error});
                                                });
                                        }
                                    }, function (error) {
                                        res.send({status: false, error: error});
                                    });
                            }, function (error) {
                                res.send({status: false, error: error});
                            });
                    }
                    else {
                        app.query.updateUser(data[0].uid, 1, Q)
                            .then(function (update) {
                                app.session.username = req.body.username;
                                res.send({status: true, data: data});
                            }, function (error) {
                                res.send({status: false, error: error});
                            });
                    }
                }
                ,
                function (err) {
                    res.send({status: false, error: err});
                })
        }
    };



    app.api.getRecord = function (req, res) {
        app.session = req.session;
        if (app.session.username) {
            console.log(req.params.id);
            app.query.selectInventory(req.params.id, Q)
                .then(function (data) {
                    res.send({status: true, data: data});
                }, function (error) {
                    res.send({status: false, error: error});
                });
        } else {
            res.send({status: false, message: 'Please Login First'})
        }
    }


};