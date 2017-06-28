// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Creates a Brewery Schema. This will be the basis of how user data is stored in the db
var BrewerySchema = new Schema({
    name: {type: String, required: true},
    street: {type: String, required: true},
    tel: {type: Number, required: true},
    site: {type: String, default: "Todavia no..."},
    location: {type: [Number], required: true}, // [Long, Lat]
    /*
    horariosOC: [[String]], //Array of arrays (days) with array of time open-close
    */
    happyHour: {type: [String], required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

// Sets the created_at parameter equal to the current time
BrewerySchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// Indexes this schema in 2dsphere format (critical for running proximity searches)
BrewerySchema.index({location: '2dsphere'});

// Exports the BrewerySchema for use elsewhere. Sets the MongoDB collection to be used as: "cervecerias"
module.exports = mongoose.model('cerveceria', BrewerySchema);
