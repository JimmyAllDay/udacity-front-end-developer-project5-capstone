function updateUI() {
  // UI elements to be updated
  const city = document.getElementById('city');
  const inputDate = document.getElementById('date');

  // Show inputted city in UI
  city.addEventListener('change', event => {
    const result = document.querySelector('.dest-result');
    result.textContent = `${event.target.value}`;
  });

  // Show inputted date in UI
  inputDate.addEventListener('change', event => {
    const result = document.querySelector('.date-result');
    result.textContent = `${event.target.value}`;
  });
}

export { updateUI };
