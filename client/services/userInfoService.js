(function(){
    'use strict';
    angular.module("AuctionSystem")
    .service('userInfo',userInfo);
userInfo.$inject = ['$http','$q','appConfig','mainService'];

function userInfo($http,$q,appConfig,mainService){
    this.getUser = getUser;
    this.getInventory = getInventory;
    
    function getUser(){
        var data = mainService.getId();
        var defer = $q.defer();
        $http.post(appConfig.apiBaseUrl + "getuser",{id:data})
        .success(function (res) {
                    if (res.status) {
                        defer.resolve(res.data[0]);
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
   function getInventory(){
      var data  = mainService.getId();
      var defer = $q.defer();
        $http.post(appConfig.apiBaseUrl + "getInventory",{id:data})
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
    
    
}());