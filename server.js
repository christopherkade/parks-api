const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require("body-parser"),
  Themeparks = require("themeparks");

// TODO: Change allow origin value to the right URL when going live
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://christopherkade.com/*');
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

// DISNEYLAND PARIS
app.get('/api/dlp-mk', (req, res) => {
  const mk = new Themeparks.Parks.DisneylandParisMagicKingdom();
  let allRides = [];

  mk.GetWaitTimes().then(function(rides) {
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

app.get('/api/dlp-wds', (req, res) => {
  const wds = new Themeparks.Parks.DisneylandParisWaltDisneyStudios;
  let allRides = [];

  wds.GetWaitTimes().then(function(rides) {
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

// WALT DISNEY WORLD
app.get('/api/wdw-mk', (req, res) => {
  const mk = new Themeparks.Parks.WaltDisneyWorldMagicKingdom;
  let allRides = [];

  mk.GetWaitTimes().then(function(rides) {
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

app.get('/api/wdw-epcot', (req, res) => {
  const epcot = new Themeparks.Parks.WaltDisneyWorldEpcot;
  let allRides = [];

  epcot.GetWaitTimes().then(function(rides) {
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

app.get('/api/wdw-hs', (req, res) => {
  const hs = new Themeparks.Parks.WaltDisneyWorldHollywoodStudios;
  let allRides = [];

  hs.GetWaitTimes().then(function(rides) {
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

app.get('/api/wdw-ak', (req, res) => {
  const ak = new Themeparks.Parks.WaltDisneyWorldAnimalKingdom;
  let allRides = [];

  ak.GetWaitTimes().then(function(rides) {
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

// DISNEYLAND RESORT
app.get('/api/dlr-mk', (req, res) => {
  const mk = new Themeparks.Parks.DisneylandResortMagicKingdom;
  let allRides = [];

  mk.GetWaitTimes().then(function(rides) {
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

app.get('/api/dlr-ca', (req, res) => {
  const ca = new Themeparks.Parks.DisneylandResortCaliforniaAdventure;
  let allRides = [];

  ca.GetWaitTimes().then(function(rides) {
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
