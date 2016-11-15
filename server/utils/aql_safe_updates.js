module.exports = function (app, Q) {


    app.utils.sqlSafeUpdates = function () {
        // console.log('SQL_SAFE_UPDATES started!');
        app.query.genericQuery('SET SQL_SAFE_UPDATES = 0;', Q)
            .then(function (response) {
                //  console.log('response: ',response);
            }, function (err) {
                //  console.log('err',err)
            })
    }
};