angular.module("AuctionSystem")
    // used self calling function to assign value in appConfig
    .constant("appConfig",(function (){

        //var environment = "production";
        var environment = "development";

        var config = {
            production : {
                'apiBaseUrl': 'http://localhost:4000/api/'
            },
            development : {
                'apiBaseUrl': 'http://localhost:4000/api/'
            }
        };
        return config[environment];
    })());

