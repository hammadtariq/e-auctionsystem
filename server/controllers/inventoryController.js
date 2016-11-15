module.exports = function (app, Q) {
    /**
     * get Inventory Function (user all inventories)
     * @params uid
     * */
    app.api.getInventory = function (req, res) {
        app.query.selectInventory(req.body.id, Q)
            .then(function (response) {
                if (response.length) {
                    res.send({status: true, data: response})
                } else {
                    res.send({status: false, message : "inventories not found"})
                }
            }, function (err) {
                res.send({status: false, error: err})
            })
    };
};
