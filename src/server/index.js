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

// get data from geonames API
const getGeoCoords = async callback => {
  // Geonames variables
  const geoUserName = 'jimmyallday';
  const geoAddress = appData.input;
  const geoURL = `http://api.geonames.org/geoCodeAddressJSON?q=${geoAddress}&username=${geoUserName}`;

  // fetch latitude and longitude from geonames
  await fetch(geoURL)
    .then(response => response.json())
    .then(data => {
      callback(data);
    })
    .catch(
      err =>
        `An error occured while fetching from geonames API:${console.log(err)}`
    );
};
// ----------------------Weatherbit---------------------
// get weather data from  weatherbit API
const getWeather = async callback => {
  // declare variables
  let geoCoords = {};
  const weatherbitKey = 'a348677a97634b37b0e00c848638f61b';
  await getGeoCoords(data => {
    geoCoords = { lng: data.address.lng, lat: data.address.lat };
  });
  await fetch(
    `https://api.weatherbit.io/v2.0/current?lat=${geoCoords.lat}&lon=${geoCoords.lng}&key=${weatherbitKey}`
  )
    .then(response => response.json())
    .then(data => {
      console.log(data);
      callback(data);
    })
    .catch(err => `An error occured while fetching from weatherbit API:${err}`);
};

// ---------------------Pixabay-----------------------

// get image from pixabayAPI
const getImage = async callback => {
  const pixabayBaseURL = 'https://pixabay.com/api/';
  const pixabayKey = '21655976-5d826fa8819430011ae8ac9d3';
  await fetch(
    `${pixabayBaseURL}?key=${pixabayKey}&q=${appData.input}+city&image_type=photo&category=places`
  )
    .then(response => response.json())
    .then(data => {
      callback(data);
    })
    .catch(err => `An error occured while fetching from pixabay API:${err}`);
};

// ----------------------Response---------------------

// POST Route
app.post('/geoname', async (req, res) => {
  appData = req.body;
  let responseData = [];
  await getWeather(data => {
    responseData.push({ weatherbit: data });
    console.log(responseData);
  });
  await getImage(data => {
    responseData.push({ pixabay: data });
  });

  await res.send(responseData);
});
