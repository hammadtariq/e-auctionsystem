(function () {
    'use strict';
    angular.module("AuctionSystem")
        .service('auctionService', auctionService);
    auctionService.$inject = ['$http', '$q', 'authService', 'Socket', 'mainService'];

    function auctionService($http, $q, authService, Socket, mainService) {
        var vm = this;
        var user_name = null;
        var aucItem = null;
        vm.startAuction = startAuction;
        vm.getCurrentAucItem = getCurrentAucItem;

        function startAuction(item) {
            user_name = localStorage.name;
            item.seller_name = user_name;
            var defer = $q.defer();
            Socket.emit("auction", item);
             Socket.on('check_auction', function (bid) {
                if(bid.status){
                    defer.resolve({show:true,message:'Request denied, already another auction is in process'});
                }
                else{
                    defer.reject(bid);
                }
            });
            Socket.on('my_bid', function (bid) {
                if(bid.auction.user_id == localStorage.id){
                    aucItem = bid.auction;
                    defer.resolve(bid.auction);
                }
                else{
                    defer.reject(bid);
                }
            });
            return defer.promise;
        }

        function getCurrentAucItem(){
            return aucItem;
        }

        Socket.on('bid', function (bid) {
            console.log("bid", bid);
        });

    }

}());