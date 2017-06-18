// Creates the listCtrl Module and Controller
var listCtrl = angular.module('listCtrl', []);
listCtrl.controller('listCtrl',  function($scope, $http){

    // Initializes Variables
    // ----------------------------------------------------------------------------
    $http.get('/breweries').success(function(response){
        $scope.cervecerias = response;
    })
    .error(function (data) {
        console.log('Error: ' + data);
    });

    // Functions
    // ----------------------------------------------------------------------------

});