const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require("body-parser"),
  Themeparks = require("themeparks");

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://parksapi.herokuapp.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');
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

app.get('/api/dlp', (req, res) => {
  const dlp = new Themeparks.Parks.DisneylandParisMagicKingdom();
  let allRides = [];

  dlp.GetWaitTimes().then(function(rides) {
    // Get wait times for Paris rides
    for (let i = 0, ride; ride = rides[i++];) {
      allRides.push(ride);
    }
    if (allRides !== null) {
      res.status(200).json(allRides);
    }
  }, console.error(error => {
    res.status(500).send(error)
  }));
});

app.listen(port);
console.log('RESTful API server started on: ' + port);
