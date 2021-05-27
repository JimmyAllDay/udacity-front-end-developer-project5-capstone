import { getUserInput } from './getUserInput.js';
import { getServerData } from './getServerData.js';
import { compareDate } from './compareDate';

const publishServer = () => {
  //   const userData = inputs;
  // ------------- Variables ----------------------
  const submitButton = document.getElementById('submitbtn');
  let weatherDisplay = document.getElementById('weather-forecast');
  let pictureDiv = document.getElementById('placeImage');

  // ------------- Retrieve and Dsiplay Data  ------------

  submitButton.addEventListener('click', async function() {
    compareDate();
    const inputs = await getUserInput();
    console.log(inputs);

    let data = await getServerData(inputs);
    console.log(data);
    weatherDisplay.innerText = `The weather forecast at your destination on the date you are traveling is expected to be ${data[0].weatherbit.data[0].weather.description} and ${data[0].weatherbit.data[0].temp}\u00B0 C`;
    pictureDiv.src = data[1].pixabay.hits[0].largeImageURL;
  });
};

export { publishServer };
