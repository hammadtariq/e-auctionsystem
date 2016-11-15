module.exports = function (app, Q) {
    /**
     * logout Function
     * @params uid
     * */

    app.api.logout = function (req, res) {
        app.query.updateUser(req.body.uid, 0, Q)
            .then(function (update) {
                req.session.destroy(function (err) {
                    if (err) {
                        console.log(err);
                        res.send({status: false, error: err});
                    } else {
                        res.send({status: true});
                    }
                });
            }, function (error) {
                res.send({status: false, error: error});
            });
    };
};