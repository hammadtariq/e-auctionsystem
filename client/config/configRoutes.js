(function(){
    'use strict';
    angular
        .module('AuctionSystem')
        .config(config);
    config.$inject =['$stateProvider','$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/signin');
        $stateProvider
            .state("signin", {
                url: "/signin",
                templateUrl: "components/signin/signin.html",
                controller: "SignInController",
                controllerAs:'login'
            })
            .state("dashboard", {
                url: "/dashboard",
                templateUrl: "components/dashboard/dashboard.html",
                controller: "DashboardController",
                controllerAs:'dashboard',
                loginCompulsory: true
            });
    }

}());
