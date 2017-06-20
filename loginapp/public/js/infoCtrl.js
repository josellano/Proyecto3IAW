// Creates the infoCtrl Module and Controller
var infoCtrl = angular.module('infoCtrl', []);
infoCtrl.controller('infoCtrl', function($scope, $http, $routeParams){

    // Initializes Variables
    // ----------------------------------------------------------------------------
	var url = "/breweries/" + $routeParams.id;
	$http.get(url).success(function(response){
        $scope.cerveceria = response;
    })
    .error(function (data) {
        console.log('Error: ' + data);
    });

    // Functions
    // ----------------------------------------------------------------------------

});