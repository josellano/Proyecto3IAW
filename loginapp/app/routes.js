
// Dependencies
var mongoose = require('mongoose');
var Brewery   = require('./model.js');

// Opens App Routes
module.exports = function(app) {

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all breweries in the db
    app.get('/breweries', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        var query = Brewery.find({});
        query.exec(function(err, breweries){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of all breweries
            res.json(breweries);
        });
    });

    // Retrieve records for id brewery in the db
    app.get('/breweries/:id', function(req, res){

        // Uses Mongoose schema to run the search with id
        var id = req.params.id;
        var query = Brewery.findOne({'_id':id});
        query.exec(function(err, brewery){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of all breweries
            res.json(brewery);
        });
    });

    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new breweries in the db
    app.post('/breweries', function(req, res){

        // Creates a new User based on the Mongoose schema and the post body
        var newbrewery = new Brewery(req.body);

        // New User is saved in the db.
        newbrewery.save(function(err){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of the new brewery
            res.json(req.body);
        });
    });

    // Retrieves JSON records for all users who meet a certain set of query conditions
    app.post('/query', function(req, res){

    // Grab all of the query parameters from the body.
    var lat             = req.body.latitude;
    var long            = req.body.longitude;
    var distance        = req.body.distance;

    // Opens a generic Mongoose Query. Depending on the post body we will...
    var query = Brewery.find({});

    // ...include filter by Max Distance (converting miles to meters)
    if(distance){

        // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
        query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]}, maxDistance: distance,

            // Specifying spherical geometry (for globe)
            spherical: true});
    }

    // Execute Query and Return the Query Results
    query.exec(function(err, breweries){
        if(err)
            res.send(err);

        // If no errors, respond with a JSON of all breweries that meet the criteria
        res.json(breweries);
    });
});
};
