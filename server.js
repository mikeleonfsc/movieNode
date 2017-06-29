var express = require('express'),

    wine = require('./routes/wines');



var app = express();
var cors = require('cors')
app.use(cors())   



app.configure(function () {

    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */

    app.use(express.bodyParser());
/*
    var cors = require('cors');

    app.use(cors({ origin: 'http://localhost:4300' }));
  */

     
});

app.get('/wines/:id', wine.findById);
app.get('/wines', wine.findAll);
app.get('/wines/find/:name', wine.findName);
app.post('/wines', wine.addMovie);
app.delete('/wines/:id', wine.deleteMovie);
app.put('/wines/:id', wine.updateMovie);

/*
 






*/
app.listen(3000);

console.log('Listening on port 3000...');