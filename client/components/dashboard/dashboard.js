(function () {
    'use strict';
    angular
        .module("AuctionSystem")
        .controller('DashboardController', DashboardController);
    DashboardController.$inject = ['mainService', '$state', 'Socket'];
    function DashboardController(mainService, $state, Socket) {
        var vm = this;
        vm.name = 'user';
        vm.show = false;
        vm.bid = [];

        getUserRecord();

        function getUserRecord(){
            mainService.getUserRecord()
                .then(function (data) {
                    vm.show = true;
                    Socket.connect();
                }, function (error) {
                    console.log("error in getting record ", error);
                    localStorage.clear();
                    $state.go('signin');
                })
        }


    }


}());