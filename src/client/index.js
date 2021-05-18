import { getUserInput } from './js/getUserInput.js';
import { getServerData } from './js/getServerData.js';
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
  const inputs = await getUserInput();
  console.log(inputs);
  getServerData(inputs);
});
