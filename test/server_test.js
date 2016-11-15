/**
 * Primary User Tests
 */

var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest.agent('http://localhost:4000');
describe('Authentication routes\n', function () {
    it('should correctly update an existing account', function (done) {
        api.post('/api/authenticate')
            .set('Accept', 'applications/json')
            .send({
                username: "tom"
            })
            .expect(200)
            .end(function (err, res) {
                console.log("authenticate ", res.body);
                expect(res.body.data[0]).to.have.property("userName");
                expect(res.body.data[0].userName).to.not.equal("null");
                if (err) {
                    done(err);
                    console.log(err);
                } else {
                    done();
                }
            });

    });

    //Primary User Routes
    it('Logout Put', function (done) {
        api.put('/api/logout')
            .set('Accept', 'applications/json')
            .send({
                username: "tom"
            })
            .expect(200)
            .end(function (err, res) {
                console.log("user logout ", res.body);
                if (err) {
                    done(err);
                    console.log(err);
                } else {
                    done();
                }
            });
    });
});
describe('Primary User App Routes and Data Manipulation\n', function () {
    it('getuser', function (done) {
        api.post('/api/getuser')
            .set('Accept', 'applications/json')
            .expect(200)
            .send({
                username: "tom"
            })
            .end(function (err, res) {
                console.log("\ngetuser Route ", res.body);
                if (err) {
                    console.log('Error : ', err);
                    done(err);
                } else {
                    done();
                }
            });
    });
    it('getInventory', function (done) {
        api.post('/api/getInventory')
            .set('Accept', 'applications/json')
            .expect(200)
            .send({
                id: "a35dfb77232211e699ae0a0027000000"
            })
            .end(function (err, res) {
                console.log("\ngetInventory Route ", res.body);
                if (err) {
                    console.log('Error : ', err);
                    done(err);
                } else {
                    done();
                }
            });
    });
    it('startAuction', function (done) {
        api.get('/api/recorda35dfb77232211e699ae0a0027000000')
            .set('Accept', 'applications/json')
            .expect(200)
            .end(function (err, res) {
                console.log("\ngetInventory Route ", res.body);
                if (err) {
                    console.log('Error : ', err);
                    done(err);
                } else {
                    done();
                }
            });
    });
});
