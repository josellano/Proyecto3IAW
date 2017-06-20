// Declares the initial angular module "meanMapApp". Module grabs other controllers and services.
var app = angular.module('meanMapApp', ['addCtrl', 'queryCtrl', 'listCtrl', 'infoCtrl', 'geolocation', 'gservice', 'ngRoute'])

    // Configures Angular routing -- showing the relevant view and controller when needed.
    .config(function($routeProvider){

        // Add cerveceria Control Panel
        $routeProvider.when('/add', {
            controller: 'addCtrl',
            templateUrl: 'partials/addForm.html',

        // Find near cervecerias Control Panel
		}).when('/find', {
		    controller: 'queryCtrl',
		    templateUrl: 'partials/queryForm.html',

        // Show cervecerias Control panel
        }).when('/list', {
            controller: 'listCtrl',
            templateUrl: 'partials/listForm.html',

        // Show cerveceria Control panel
        }).when('/brewery/:id', {
            controller: 'infoCtrl',
            templateUrl: 'partials/infoForm.html',

        // All else forward to the Show cervecerias Control panel
        }).otherwise({redirectTo:'/list'})
});
