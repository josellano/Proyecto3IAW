// Declares the initial angular module "meanMapApp". Module grabs other controllers and services.
var app = angular.module('meanMapApp', ['addCtrl', 'queryCtrl', 'listCtrl', 'geolocation', 'gservice', 'ngRoute'])

    // Configures Angular routing -- showing the relevant view and controller when needed.
    .config(function($routeProvider){

        // Join Team Control Panel
        $routeProvider.when('/add', {
            controller: 'addCtrl',
            templateUrl: 'partials/addForm.html',

        // Find Teammates Control Panel
		}).when('/find', {
		    controller: 'queryCtrl',
		    templateUrl: 'partials/queryForm.html',

        // Find cervecerias list panel
        }).when('/list', {
            controller: 'listCtrl',
            templateUrl: 'partials/listForm.html',

        // All else forward to the Join Team Control Panel
      }).otherwise({redirectTo:'/find'})
    });
