module.exports = function (app, Q) {

    /**
     * getUser Function
     * @params id
     * */

    app.api.getUser = function (req, res) {
        app.query.selectUser(req.body, Q)
            .then(function (user) {
                if (user.length > 0) {
                    res.send({status: true, data: user});
                }
                else {
                    res.send({status: false});
                }
            }, function (err) {
                res.send({status: false, error: err});
            })
    };


    app.utils.sqlSafeUpdates();

    

};