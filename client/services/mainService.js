(function () {
    'use strict';
    angular
        .module("AuctionSystem")
        .service('mainService', mainService);
    mainService.$inject = ['$http', '$q', 'appConfig'];

    function mainService($http, $q, appConfig) {
        var vm = this;
        vm.userId = null;
        vm.getId = getId;
        vm.setId = setId;
        vm.getUserRecord = getUserRecord;

        function setId(id) {
            vm.userId = id;
        }

        function getId() {
            if (vm.userId) {
                return vm.userId
            } else {
                vm.userId = localStorage.getItem('id');
                return vm.userId;
            }
        }

        function getUserRecord() {
            var defer = $q.defer();
            $http.get(appConfig.apiBaseUrl + "record" + vm.userId)
                .success(function (res) {
                    if (res.status) {
                        defer.resolve(res.data);
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
    }
})();