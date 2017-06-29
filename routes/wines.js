var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movies');

var MovieSchema = new mongoose.Schema({
    id: Number,
    name: String,
    watchAgain: Boolean,
    rating: Number,
    updated_at: { type: Date, default: Date.now },
});

// Create a model based on the schema
var Movie = mongoose.model('Movie', MovieSchema);

 

// Create a todo in memory
var mov = new Movie({ name: 'Master NodeJS', watchAgain: false, rating: 1});

// Save it to database
/*
mov.save(function (err) {
    if (err)
        console.log(err);
    else
        console.log(mov);
});
*/


exports.findAll = function (req, res) {
    Movie.find(function (err, movies) {
        console.log('sending all movies');
        res.send(movies);
        console.log('movies sent');
    });
};

exports.findById = function (req, res) {
    var id = req.params.id;
    console.log('Retrieving movie: ' + id);
    Movie.findById(id, function (err, movie) {
        console.log('sending movie for id: '+ id);
        res.send(movie);
        console.log('movie sent');
    });
};

exports.findName = function (req, res) {
    var name = req.params.name;
    console.log('Retrieving movie: ' + name);
    Movie.findOne({'name': name}, function (err, movie) {
        console.log('searcing for movie name: ' + name);
        res.send(movie);
        console.log('movie sent: ' +movie);
    });
};

exports.addMovie = function (req, res) {
    var rawMovie = req.body;
    console.log('Adding moving: ' + JSON.stringify(rawMovie));
    var movie = new Movie(rawMovie); //dont work- mongoose.model(rawMovie, MovieSchema);
    movie.save(function (err) {
        if (err)
            console.log(err);
        else
            console.log('new movie saved!' + movie);
            res.send(movie);
    });
    
};

exports.deleteMovie = function (req, res) {
    var id = req.params.id;
    console.log('Deleting movie: ' + id);
    Movie.findByIdAndRemove (id, function (err) {
        if (err)
            console.log(err);
        else
            console.log('movie deleted!' + mov);
        res.send(id);
    });

}

exports.updateMovie = function (req, res) {
    var id = req.params.id;
    var rawMovie = req.body;
    console.log('Adding moving: ' + JSON.stringify(rawMovie));
    var query = { _id: rawMovie._id };
    Movie.findByIdAndUpdate(query, rawMovie, function (err) {
        if (err)
            console.log(err);
        else
            console.log('movie updated!' + rawMovie);
        res.send(id);
    });

}

/*
var mongo = require('mongodb');
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, { auto_reconnect: true });
db = new Db('winedb', server);

db.open(function (err, db) {
    if (!err) {
        console.log("Connected to 'winedb' database");
        db.collection('wines', { strict: true }, function (err, collection) {
            if (err) {
                console.log("The 'wines' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findById = function (req, res) {
    var id = req.params.id;
    console.log('Retrieving wine: ' + id);
    db.collection('wines', function (err, collection) {
        collection.findOne({ '_id': new db.collection.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function (req, res) {
    db.collection('wines', function (err, collection) {
        collection.find().toArray(function (err, items) {
            res.send(items);
        });
    });
};

exports.addWine = function (req, res) {
    var wine = req.body;
    console.log('Adding wine: ' + JSON.stringify(wine));
    db.collection('wines', function (err, collection) {
        collection.insert(wine, { safe: true }, function (err, result) {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateWine = function (req, res) {
    var id = req.params.id;
    var wine = req.body;
    console.log('Updating wine: ' + id);
    console.log(JSON.stringify(wine));
    db.collection('wines', function (err, collection) {
        collection.update({ '_id': new BSON.ObjectID(id) }, wine, { safe: true }, function (err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({ 'error': 'An error has occurred' });
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(wine);
            }
        });
    });
}

exports.deleteWine = function (req, res) {
    var id = req.params.id;
    console.log('Deleting wine: ' + id);
    db.collection('wines', function (err, collection) {
        collection.remove({ '_id': new BSON.ObjectID(id) }, { safe: true }, function (err, result) {
            if (err) {
                res.send({ 'error': 'An error has occurred - ' + err });
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}
*/

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
/*
var populateDB = function () {

    var wines = [
        {
            name: "CHATEAU DE SAINT COSME",
            year: "2009",
            grapes: "Grenache / Syrah",
            country: "France",
            region: "Southern Rhone",
            description: "The aromas of fruit and spice...",
            picture: "saint_cosme.jpg"
        },
        {
            name: "LAN RIOJA CRIANZA",
            year: "2006",
            grapes: "Tempranillo",
            country: "Spain",
            region: "Rioja",
            description: "A resurgence of interest in boutique vineyards...",
            picture: "lan_rioja.jpg"
        }];

    db.collection('wines', function (err, collection) {
        collection.insert(wines, { safe: true }, function (err, result) { });
    });
};
*/