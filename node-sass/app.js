// Initialize the app
var express = require('express');
var app     = express();

// Listen for incoming requests and serve them.
var port    = process.env.PORT || 3000;
var sassMiddleware = require('node-sass-middleware');

app.set('views', './views');
app.set('view engine', 'jade');

// Setup SASS directories
var path = require('path');
app.use(sassMiddleware({
    src: __dirname + '/sass', 
    dest: __dirname + '/public/stylesheets', 
    debug: true, 
    outputStyle: 'compressed' 
  }),
  // The static middleware must come after the sass middleware
  express.static(path.join(__dirname, 'public'))
)

app.get('/', function(req, res) {
    res.render('index');
});

app.listen(port);
console.log('Server started on ' + port);