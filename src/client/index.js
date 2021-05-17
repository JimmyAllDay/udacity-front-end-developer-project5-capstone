import { getData } from './js/getData.js';
import { sendGeoName } from './js/sendGeoName.js';
// import { compareDate } from './js/compareDate.js';
import { updateUI } from './js/updateUI.js';
import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';

console.log('CHANGE!!');

// ------------- Variables ----------------------
const submitButton = document.getElementById('submitbtn');

// ------------- Form Submission ----------------

updateUI();

submitButton.addEventListener('click', async function() {
  const inputs = await getData();
  console.log(inputs);

  //   compareDate(a, b); - this may be needed to check if the user inputted date is within a week
  sendGeoName(inputs.userCity);
});
