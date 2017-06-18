// Creates the addCtrl Module and Controller. Note that it depends on the 'geolocation' and 'gservice' module and service.
var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice']);
addCtrl.controller('addCtrl', function($scope, $http, $rootScope, geolocation, gservice){

    // Initializes Variables
    // ----------------------------------------------------------------------------
    $scope.formData = {};
    var coords = {};

    // Set initial coordinates to the center Bahia Blanca
    $scope.formData.latitude = -38.718;
    $scope.formData.longitude = -62.266;

    // Get User's actual coordinates based on HTML5 at window load
    geolocation.getLocation().then(function(data){

        // Set the latitude and longitude equal to the HTML5 coordinates
        coords = {lat:data.coords.latitude, long:data.coords.longitude};

        // Display coordinates in location textboxes rounded to three decimal points
        $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
        $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);

        gservice.refresh($scope.formData.latitude, $scope.formData.longitude);

    });

    // Functions
    // ----------------------------------------------------------------------------
    // Get coordinates based on mouse click. When a click event is detected....
    $rootScope.$on("clicked", function(){

        // Run the gservice functions associated with identifying coordinates
        $scope.$apply(function(){
            $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
            $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
        });
    });

    // Creates a new brewery based on the form fields
    $scope.createBrewery = function() {

        // Grabs all of the text box fields
        var breweryData = {
            name: $scope.formData.name,
            street: $scope.formData.street,
            snumber: $scope.formData.snumber,
            tel: $scope.formData.tel,
            site: $scope.formData.site,
            location: [$scope.formData.longitude, $scope.formData.latitude],
            /*
            horariosOC: [
                [$scope.formData.otimeSun, $scope.formData.ctimeSun],
                [$scope.formData.otimeMon, $scope.formData.ctimeMon],
                [$scope.formData.otimeTue, $scope.formData.ctimeTue],
                [$scope.formData.otimeWen, $scope.formData.ctimeWen],
                [$scope.formData.otimeThu, $scope.formData.ctimeThu],
                [$scope.formData.otimeFri, $scope.formData.ctimeFri],
                [$scope.formData.otimeSat, $scope.formData.ctimeSat]
            ],
            */
        };

        // Saves the user data to the db
        $http.post('/breweries', breweryData)
            .success(function (data) {

                // Once complete, clear the form (except location)
                $scope.formData.name = "";
                $scope.formData.street = "";
                $scope.formData.snumber = "";
                $scope.formData.tel = "";
                $scope.formData.site = "";

                // Refresh the map with new data
                gservice.refresh($scope.formData.latitude, $scope.formData.longitude);

            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
});