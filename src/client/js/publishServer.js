import { getUserInput } from './getUserInput.js';
import { getServerData } from './getServerData.js';
import { compareDate } from './compareDate';
import { dynamicDisplay } from './dynamicDisplay.js';

const publishServer = () => {
  //   const userData = inputs;
  // ------------- Variables ----------------------
  const submitButton = document.getElementById('submitbtn');
  let weatherDisplay = document.getElementById('weather-forecast');
  let pictureDiv = document.getElementById('placeImage');

  // ------------- Retrieve and Dsiplay Data  ------------

  submitButton.addEventListener('click', async function() {
    const inputs = await getUserInput();
    let data = await getServerData(inputs);
    weatherDisplay.innerText = `The weather forecast at your destination on the date you are traveling is expected to be: ${data[0].weatherbit.data[0].weather.description} and ${data[0].weatherbit.data[0].temp}\u00B0 C`;
    pictureDiv.src = data[1].pixabay.hits[0].largeImageURL;
    await dynamicDisplay();
    await compareDate();
  });
};

export { publishServer };
