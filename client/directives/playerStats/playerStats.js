(function(){
    'use strict';
    angular
        .module("AuctionSystem")
        .directive('playerStats', playerStats);
    function playerStats(){
        var directive = {
            restrict: 'E',
            templateUrl: 'directives/playerStats/playerStats.html',
            transclude: true,
            scope: {},
            controller: playerStatsController,
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;
    }

    playerStatsController.$inject = ['$scope','$mdDialog','$mdMedia','userInfo','authService', '$state','Socket'];

    function playerStatsController($scope,$mdDialog,$mdMedia,userInfo, authService, $state,Socket) {
        var vm = this;
        vm.user ={};
        vm.logout = logout;
        getUser();
         Socket.on('auction_winner',function(data){
           getUser();
        });
        
         function getUser(){
            userInfo.getUser()
            .then(function(res){
            vm.user = res;
            })
        }
        
        function logout(){
            authService.onLeave(vm.user)
            .then(function(data){
                console.log('logged out !');
                $state.go('signin')
            }, function(error){
                console.log(error);
            });
        }
    }

}());




