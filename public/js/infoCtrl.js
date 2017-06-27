// Creates the infoCtrl Module and Controller
var infoCtrl = angular.module('infoCtrl', ['gservice']);
infoCtrl.controller('infoCtrl', function($scope, $http, $routeParams, gservice){

    // Initializes Variables
    // ----------------------------------------------------------------------------

	var url = "/breweries/" + $routeParams.id;
	$http.get(url).success(function(response){
        $scope.cerveceria = response;

        gservice.refresh($scope.cerveceria.location[1], $scope.cerveceria.location[0], [response]);
    })
    .error(function (data) {
        console.log('Error: ' + data);
    });

    // Functions
    // ----------------------------------------------------------------------------

});