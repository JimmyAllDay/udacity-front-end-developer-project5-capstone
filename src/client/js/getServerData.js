// Note - the code in this file is a product of a question posted to stackoverflow
// The question and my original code is here: https://stackoverflow.com/questions/67631488/how-do-i-nest-callbacks-for-async-functions-in-javascript?noredirect=1#comment119542810_67631488

const getServerData = async userData => {
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

  // fetch from Node server
  try {
    let response = await fetch(url, options);
    return response.json();
  } catch (err) {
    console.log(`There was an error fetching from the API POST route:${err}`);

    return null;
  }
};
export { getServerData };
