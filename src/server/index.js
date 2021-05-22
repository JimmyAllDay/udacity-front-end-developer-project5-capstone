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
  const geoAddress = appData.userCity;
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
// ----------------------WEATHERBIT---------------------

// -------------------Compare time values---------------
// Taken from https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript

const compareDate = () => {
  const userDate = new Date(appData.userDate);
  const todayDate = new Date(appData.todayDate);

  const msPerDay = 1000 * 60 * 60 * 24;

  // a and b are javascript Date objects
  function dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / msPerDay);
  }
  // test it
  const difference = dateDiffInDays(todayDate, userDate);
  return difference;
};

// -------------------Fetch from Weatherbit---------------
const getWeather = async (days, callback) => {
  const daysDiff = days;
  console.log(daysDiff);
  // declare variables
  let geoCoords = {};
  const weatherBaseUrl = 'https://api.weatherbit.io/v2.0/';
  const weatherbitKey = 'a348677a97634b37b0e00c848638f61b';
  await getGeoCoords(data => {
    geoCoords = { lng: data.address.lng, lat: data.address.lat };
  });
  // logic to determine which API to hit
  if (daysDiff >= 7) {
    console.log(`hitting the 7+ days api`);
    // If the date of travel is < 6 days
    await fetch(
      `${weatherBaseUrl}forecast/daily?lat=${geoCoords.lat}&lon=${geoCoords.lng}&key=${weatherbitKey}`
    )
      .then(response => response.json())
      .then(data => {
        callback(data);
      })
      .catch(
        err =>
          `An error occured while fetching from weatherbit future forecast API:${err}`
      );
  } else {
    console.log(`hitting the 6- days api`);
    await fetch(
      `${weatherBaseUrl}current?lat=${geoCoords.lat}&lon=${geoCoords.lng}&key=${weatherbitKey}`
    )
      .then(response => response.json())
      .then(data => {
        callback(data);
      })
      .catch(
        err =>
          `An error occured while fetching from weatherbit current weather API:${err}`
      );
  }
};

// ---------------------Pixabay-----------------------

// get image from pixabayAPI
const getImage = async callback => {
  const pixabayBaseURL = 'https://pixabay.com/api/';
  const pixabayKey = '21655976-5d826fa8819430011ae8ac9d3';
  await fetch(
    `${pixabayBaseURL}?key=${pixabayKey}&q=${appData.userCity}+city&image_type=photo&category=places`
  )
    .then(response => response.json())
    .then(data => {
      callback(data);
    })
    .catch(err => `An error occured while fetching from pixabay API:${err}`);
};

// ----------------------Response---------------------

// POST Route
app.post('/nodeserver', async (req, res) => {
  appData = req.body;
  console.log(appData);
  let responseData = [];
  await getWeather(compareDate(), data => {
    responseData.push({ weatherbit: data });
  });
  await getImage(data => {
    responseData.push({ pixabay: data });
  });
  await res.send(responseData);
});
