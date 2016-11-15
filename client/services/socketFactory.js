/**
 * Created by hp Elite Book 8530p on 4/16/2016.
 */
(function(){
    angular
        .module('AuctionSystem')
        .factory('Socket' , Socket);
    function Socket(socketFactory){
        return socketFactory();
    }
})();