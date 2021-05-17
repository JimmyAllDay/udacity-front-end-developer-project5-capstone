// -------------Project Set Up -----------------

// Endpoint
let appData = {};

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

// ----------------------FUNCTIONS------------------------

// confirm port
app.listen(port, function() {
  console.log(`Example app listening on port ${port}`);
});

// ----------------------Geonames------------------------
let geoCoords = {};

// get data from geonames API
async function getGeoCoords() {
  // Geonames variables
  const geoUserName = 'jimmyallday';
  const geoAddress = appData.input;
  const geoURL = `http://api.geonames.org/geoCodeAddressJSON?q=${geoAddress}&username=${geoUserName}`;

  // fetch latitude and longitude from geonames
  await fetch(geoURL)
    .then(response => response.json())
    .then(data => {
      geoCoords = { lng: data.address.lng, lat: data.address.lat };
      return data;
    })
    .catch(
      err => `An error occured while fetching from geonames:${console.log(err)}`
    );
}

// ----------------------Weatherbit---------------------
// This variable isn't scoped properly?
let weatherData = {};
// get weather data from  weatherbit API
async function getWeather() {
  // declare variables
  const weatherbitKey = 'a348677a97634b37b0e00c848638f61b';
  await getGeoCoords();
  await fetch(
    `https://api.weatherbit.io/v2.0/current?lat=${geoCoords.lat}&lon=${geoCoords.lng}&key=${weatherbitKey}`
  )
    .then(response => response.json())
    .then(data => {
      console.log(data);
      weatherData = data;
      return data;
    })
    .catch(err => console.log(err));
}

// ----------------------Pixabay-----------------------
// get image from pixabayAPI
async function getImage() {
  const pixabayBaseURL = 'https://pixabay.com/api/';
  const pixabayKey = '21655976-5d826fa8819430011ae8ac9d3';
  fetch(
    `${pixabayBaseURL}?key=${pixabayKey}&q=${appData.input}+city&image_type=photo&category=places`
  )
    .then(response => response.json())
    .then(data => {
      // you will need to filter the pixabay results

      console.log(data);
    });
}

// ----------------------Response---------------------
async function response() {
  await getWeather();
  await getImage();
}

// POST Route
app.post('/geoname', (req, res) => {
  appData = req.body;
  console.log(appData);
  getImage();

  res.send({ response: 'response from post route is working' });
});
