var express = require('express'),

    wine = require('./routes/wines');



var app = express();



app.configure(function () {

    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */

    app.use(express.bodyParser());

});

app.get('/wines/:id', wine.findById);
app.get('/wines', wine.findAll);
app.post('/wines', wine.addMovie);
app.delete('/wines/:id', wine.deleteMovie);

/*
 


app.put('/wines/:id', wine.updateWine);




*/
app.listen(3000);

console.log('Listening on port 3000...');