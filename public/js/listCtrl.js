// Creates the listCtrl Module and Controller
var listCtrl = angular.module('listCtrl', [ 'gservice' , 'geolocation']);
listCtrl.controller('listCtrl',  function($scope, $http , geolocation , gservice, $location , $window){

    // Initializes Variables
    // ----------------------------------------------------------------------------
    $http.get('/breweries').success(function(response){
        $scope.cervecerias = response;
        // Get User's actual coordinates based on HTML5 at window load
        geolocation.getLocation().then(function(data){
            gservice.refresh(-38.718, -62.266);
        });
    })
    .error(function (data) {
        console.log('Error: ' + data);
    });


    // Functions
    // ----------------------------------------------------------------------------
    $scope.showBrewery = function(brewery_id) {
        var breweryUrl = "/brewery/" + brewery_id;
        $location.path(breweryUrl);
    }

    $scope.deleteBrewery = function(brewery_id, index) {
        var breweryUrl = "/breweries/" + brewery_id;
        $http.delete(breweryUrl);
        $scope.cervecerias.splice(index, 1);
    }
});
