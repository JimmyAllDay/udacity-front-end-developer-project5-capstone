async function sendGeoName(userData) {
  // declare data to send
  const apiData = { input: userData };
  // declare route
  const url = 'http://localhost:3030/geoname';
  //   declare request options
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(apiData) // body data type must match "Content-Type" header
  };
  await fetch(url, options)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err =>
      console.log(`There was an error fetching from the API post route:${err}`)
    );
}
export { sendGeoName };
