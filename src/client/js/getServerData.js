const getServerData = userData => {
  // declare data to send
  const apiData = userData;

  // declare route
  const url = 'http://localhost:3030/nodeserver';

  //   declare POST request options
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(apiData)
  };

  // Async function to fetch from Node server w/ callback
  const fetchUIData = async callback => {
    await fetch(url, options)
      .then(response => response.json())
      .then(data => {
        callback(data);
      })
      .catch(err =>
        console.log(
          `There was an error fetching from the API POST route:${err}`
        )
      );
  };

  // Variable to store callback data
  let serverData = [];

  // Callback function to use data from fetch call
  return fetchUIData(data => {
    serverData = data;
    console.log(serverData);
  });
};
export { getServerData };
