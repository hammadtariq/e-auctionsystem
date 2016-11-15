angular.module("AuctionSystem", ['ngMaterial', 'ui.router', 'ngMessages', 'btford.socket-io'])
    .run(function ($rootScope, $state) {
        $rootScope.$on('$stateChangeStart', function (event, toState, tdata, from, fdata) {
            var token = localStorage.id;
            if (toState.loginCompulsory && !token) {
                event.preventDefault();
                $state.go('signin');
            } else if (token && (toState.name == 'signin')) {
                event.preventDefault();
                $state.go('dashboard');
            }
        });
    });
