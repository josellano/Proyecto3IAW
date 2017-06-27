// Creates the addCtrl Module and Controller. Note that it depends on the 'geolocation' and 'gservice' module and service.
var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice']);
addCtrl.controller('addCtrl', function($scope, $http, geolocation, gservice){

    // Initializes Variables
    // ----------------------------------------------------------------------------
    $scope.formData = {};

    // Set initial coordinates to the center Bahia Blanca
    $scope.formData.latitude = -38.718;
    $scope.formData.longitude = -62.266;

    // Get user's actual coordinates based on HTML5 at window load
    geolocation.getLocation().then(function(data){

        // Display coordinates in location textboxes rounded to three decimal points
        $scope.formData.longitude = data.coords.longitude;
        $scope.formData.latitude = data.coords.latitude;

        gservice.refresh($scope.formData.latitude, $scope.formData.longitude);

    });

    // Functions
    // ----------------------------------------------------------------------------
    // Creates a new brewery based on the form fields
    $scope.createBrewery = function() {

        geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': $scope.formData.street + ', Bahía Blanca'}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {

                document.getElementById("errorDir").style.display = "none";

                // Takes the long and lat to use in the form
                $scope.formData.longitude = results[0].geometry.location.lng();
                $scope.formData.latitude  = results[0].geometry.location.lat();

                // Grabs all of the text box fields
                var breweryData = {
                    name: $scope.formData.name,
                    street: $scope.formData.street,
                    tel: $scope.formData.tel,
                    site: $scope.formData.site,
                    location: [$scope.formData.longitude, $scope.formData.latitude],
                    happyHour: [$scope.formData.hhourI, $scope.formData.hhourF],
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

                        // Refresh the map with new data
                        gservice.refresh($scope.formData.latitude, $scope.formData.longitude);

                        // Once complete, clear the form
                        $scope.formData.name = "";
                        $scope.formData.street = "";
                        $scope.formData.tel = "";
                        $scope.formData.site = "";
                        $scope.formData.latitude = "";
                        $scope.formData.longitude = "";

                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
            }
            else{
                document.getElementById("errorDir").style.display = "block";
            }
        });
    };
});
