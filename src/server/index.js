// -------------Project Set Up -----------------

// Endpoint
let appData = [];

// ------------- Express -----------------------

// import express
const express = require('express');

// init Express
const app = express();

// set port
const port = 3030;

// -------------Middleware -------------------

// import path
let path = require('path');

// import fetch
const fetch = require('node-fetch');

// import cors
const cors = require('cors');

// import body-parser
const bodyParser = require('body-parser');

// -------------------init middleware----------------------

// init middleware
app.use(cors());
app.use(bodyParser());

// serve static files
app.use(express.static('dist'));

// ----------------------Functions------------------------

// confirm port
app.listen(port, function() {
  console.log(`Example app listening on port ${port}`);
});

// Chained API Calls
async function getAPIs() {
  // Geonames variables
  let geonamesData = {};
  const geoUserName = 'jimmyallday';
  const geoAddress = appData[0].input;
  const geoURL = `http://api.geonames.org/geoCodeAddressJSON?q=${geoAddress}&username=${geoUserName}`;
  await fetch(geoURL)
    .then(response => response.json())
    .then(data => {
      geonamesData = { lng: data.address.lng, lat: data.address.lat };
      console.log(geonamesData);
      // I want to do more in here with lng and lat
    })
    .catch(
      err => `An error occured while fetching from geonames:${console.log(err)}`
    );
}

// POST Route
app.post('/geoname', (req, res) => {
  appData.push(req.body);
  getAPIs();
  res.send({ response: 'response from post route is working' });
});
