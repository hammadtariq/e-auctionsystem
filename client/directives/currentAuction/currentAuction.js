(function () {
    'use strict';
    angular
        .module('AuctionSystem')
        .directive('currentAuction', currentAuction);

    function currentAuction() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'directives/currentAuction/currentAuction.html',
            scope: {
                max: '='
            },
            link: linkFunc,
            controller: currentAuctionController,
            // note: This would be 'ExampleController' (the exported controller name, as string)
            // if referring to a defined controller in its separate file.
            controllerAs: 'auction',
            bindToController: true // because the scope is isolated
        };

        return directive;

        function linkFunc(scope, el, attr, vm) {

        }
    }

    currentAuctionController.$inject = ['$scope', 'Socket', 'auctionService', '$interval', 'authService', '$mdToast'];

    function currentAuctionController($scope, Socket, auctionService, $interval, authService, $mdToast) {

        var vm = this;
        var currentAucItem = null;
        vm.item = null;
        vm.aucStarted = false;
        vm.canBid = false;
        vm.bid_value = 0;
        vm.doBid = doBid;
        vm.countDown = 90;
        vm.bids_arr = [];
        vm.user_coins = '';
        auctionStatus();
        Socket.on('bid', function (bid) {
            //  startAuc_timer();
            if (bid.auction.user_id == localStorage.id) {
                vm.item = bid.auction;
                vm.aucStarted = true;
            }
            else {
                vm.item = bid.auction;
                vm.aucStarted = true;
                vm.canBid = true;
                vm.bid_value = vm.item.bidValue;
            }
        });
        Socket.on('bid_rcv', function (bid) {
            vm.bids_arr = bid;
            console.log('fom bid obj: ', bid);
        });
        Socket.on('timer_return', function (data) {
            vm.countDown = data;
        });
        Socket.on('auction_winner', function (data) {
            vm.canBid = false;
            vm.aucStarted = false;
            vm.bids_arr = [];
            data.name == localStorage.name ? (showSimpleToast('Congratulations ' + data.name + " you have won this auction!")) : showSimpleToast('The auction have successfully completed! ');
        });

        Socket.on('res_auction_status', function (data) {
            if (data.status) {
                vm.bids_arr = data.bids_arr;
                vm.item = data.status;
                vm.aucStarted = true;
                data.status.user_id == localStorage.id || (vm.canBid = true);
                vm.bid_value = vm.item.bidValue;
            }
        });

        function doBid() {
            vm.user_coins = +localStorage.coins;
            if (vm.bid_value > vm.user_coins) {
                showSimpleToast('You do not have enough money to place this bid.')
            } else {
                var bid = {name: localStorage.name, placed_bid: vm.bid_value};
                vm.item.bid = vm.bid_value;
                if (bid_not_allowed(bid)) {
                    showSimpleToast('You cannot bid over yourself!')
                }
                emit("do_bid", bid);
                vm.bids_arr.length > 4 && (vm.bids_arr.pop());
                console.log(vm.bids_arr);
            }
        }


        function get_currentUser() {
            return authService.getUser();
        }

        function emit(evt, data) {
            Socket.emit(evt, data);
        }

        function bid_not_allowed(bid) {
            return (vm.bids_arr.length && (vm.bids_arr[0].name == bid.name))
        }

        function auctionStatus() {
            emit('auction_status', 1)
        }

        function showSimpleToast(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('bottom right')
                    .hideDelay(6000)
            );
        }
    }
}());
