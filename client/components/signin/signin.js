(function () {
    'use strict';
    angular
        .module("AuctionSystem")
        .controller('SignInController', SignInController);
    SignInController.$inject = ['$state', 'authService'];
    function SignInController($state, authService) {
        var vm = this;
        vm.user = {};
        vm.onLogin = onLogin;

        function onLogin() {
            console.log(vm.user);
            authService.onLogin(vm.user)
                .then(function (data) {
                    $state.go('dashboard');
                }, function (error) {
                    console.log("login error ", error);
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent("Internal Server Error")
                            .position('bottom right')
                            .hideDelay(6000)
                    );
                });
        }
    }

}());

