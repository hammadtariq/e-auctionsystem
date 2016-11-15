(function () {
    'use strict';
    angular
        .module("AuctionSystem")
        .directive('inventory', inventory);
    function inventory() {
        var directive = {
            restrict: 'E',
            templateUrl: 'directives/inventory/inventory.html',
            transclude: true,
            scope: {},
            controller: inventoryController,
            controllerAs: 'inventory',
            bindToController: true
        };
        return directive;
    }

    inventoryController.$inject = ['$rootScope', '$scope', '$mdDialog', '$mdMedia', 'userInfo', 'auctionService','Socket'];

    function inventoryController($rootScope, $scope, $mdDialog, $mdMedia, userInfo, auctionService,Socket) {
        var vm = this;
        vm.item = {
            quantity: '',
            minBid: '',
            name: ''
        };

        vm.auctionDialog = auctionDialog;
        vm.currentInventories = {};
        getInventory();
        
        Socket.on('auction_winner',function(data){
           getInventory();
        });
        function auctionDialog(ev, item) {
            $rootScope.selectedItem = item;
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && vm.customFullscreen;
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: '../../vendors/auctionDialogue.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: useFullScreen
                })
                .then(function () {
                    console.log('auction started!');

                }, function () {
                    console.log('auction canceled!')
                });
            $scope.$watch(function () {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function (wantsFullScreen) {
                vm.customFullscreen = (wantsFullScreen === true);
            });
        }

        function DialogController($scope, $mdDialog, $mdToast, Socket) {

            var vm = $scope;
            var message = '';

            vm.bid = [];
            vm.bidItem = {};
            vm.currentItem = '';
            vm.getCurrentItem = getCurrentItem;
            vm.showSimpleToast = showSimpleToast;
            vm.showActionToast = showActionToast;
            vm.startAuction = startAuction;
            vm.setAucObj = setAucObj;

            function getCurrentItem() {
                if ($rootScope.selectedItem) {
                    vm.currentItem = $rootScope.selectedItem;
                    return true;
                } else {
                    return false;
                }
            }

            vm.hide = function () {
                $mdDialog.hide();
            };

            vm.cancel = function () {
                $mdDialog.cancel();
            };

            function setAucObj(item) {
                console.log('current item',vm.currentItem);
                item.inv_id = vm.currentItem.inv_id;
                item.user_id = vm.currentItem.user_id;
                item.image_url = vm.currentItem.image_url;
                item.name = vm.currentItem.name;
                vm.startAuction(item);
            }

            function startAuction(item) {
                auctionService.startAuction(item)
                    .then(function (response) {
                        if(response.show){
                            showSimpleToast(response.message);
                            vm.hide();
                        }
                        else{
                            console.log('auction started wow ', response);
                            message = 'Auction of ' + vm.currentItem.name + ' started';
                            console.log('message:',message);
                            vm.hide();
                            showSimpleToast(message);    
                        }
                        
                    }, function (err) {
                        message = 'Auction not started due to some network issue';
                        showSimpleToast(message);
                        console.log('auction not started due to ', err);
                    });
            }

            function showSimpleToast(message) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(message)
                        .position('bottom right')
                        .hideDelay(3000)
                );
            }

            function showActionToast(message) {
                var toast = $mdToast.simple()
                    .textContent(message)
                    .action('OK')
                    .highlightAction(false)
                    .position('top right');
                $mdToast.show(toast).then(function (response) {
                    if (response == 'ok') {
                    }
                });
            }

        }

        function getInventory() {
            userInfo.getInventory()
                .then(function (res) {
                    console.log('res from client getInventory: ', res);
                    vm.currentInventories = res;
                }, function (err) {
                    console.log('err from client getInventory', err)
                })
        }
        function auctionStatus(){
            emit('auction_status',1)
        }
    }

}());




