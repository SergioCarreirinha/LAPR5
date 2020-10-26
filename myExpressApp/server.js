// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

//Database
var mongoose   = require('mongoose');

mongoose.connect('mongodb+srv://user1:1234@cluster0.ny4dz.mongodb.net/bear?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

var No     = require('./app/models/bear'); //must be before db

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/bear')

    // create a node (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        var no = new No();      // create a new instance of the Bear model
        console.log(req.body);
        no.name= req.body.name;  // set the bears name (comes from the request)
        console.log ("aqui222");
        // save the bear and check for errors
        no.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Node created!' });
        });

    })

    // get all the nodes (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        No.find(function(err, nos) {
            if (err)
                res.send(err);

            res.json(nos);
        });
    });

app.use('/api', router);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

app.listen(port);
console.log('Magic happens on port ' + port);