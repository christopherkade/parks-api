const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  api = require('./api/parksRoutes'),
  bodyParser = require("body-parser"),
  Themeparks = require("themeparks");

app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // TODO: Change that
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// API ROUTES
app.get('/', (req, res) => {
  res.send('Parks API works !');
});

// GET all park names
app.get('/api/parks', (req, res) => {
  let parks = [];
  for (var park in Themeparks.Parks) {
    console.log("* " + new Themeparks.Parks[park]().Name + " (" + park + ")");
    parks.push(new Themeparks.Parks[park]().Name)
  }
  res.status(200).json(parks);
});


app.listen(port);
console.log('RESTful API server started on: ' + port);
