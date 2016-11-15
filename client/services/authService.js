(function () {
    'use strict';
    angular
        .module("AuctionSystem")
        .service('authService', authService);
    authService.$inject = ['$http', '$q', 'appConfig', 'mainService'];

    function authService($http, $q, appConfig, mainService) {
        var loggedInUser = null;
        this.onLogin = onLogin;
        this.getUser = getUser;
        this.onLeave = onLeave;

        function onLogin(user) {
            var defer = $q.defer();
            $http.post(appConfig.apiBaseUrl + "authenticate", user)
                .success(function (res) {
                    if (res.status) {
                        console.log(res.data[0]);
                        localStorage.setItem('id', res.data[0].uid);
                        localStorage.setItem('name', res.data[0].userName);
                        localStorage.setItem('coins', res.data[0].coins);
                        mainService.setId(res.data[0].uid);
                        loggedInUser = res.data[0];
                        defer.resolve(res);
                    }
                    else {
                        defer.reject(res)
                    }
                })
                .error(function (err) {
                    defer.reject(err)
                });
            return defer.promise
        }

        function getUser() {
            return loggedInUser;
        }

        function onLeave(user) {
            var defer = $q.defer();
            $http.put(appConfig.apiBaseUrl + 'logout', {uid : user.uid})
                .success(function (res) {
                    if (res.status) {
                        localStorage.clear();
                        defer.resolve()
                    }
                    else {
                        defer.reject()
                    }
                })
                .error(function (err) {
                    defer.reject({error: err})
                });
            return defer.promise
        }
    }

}());
