function updateUI() {
  // UI elements to be updated
  const city = document.getElementById('city');
  const departureDate = document.getElementById('date');
  const returnDate = document.getElementById('date-return');

  // ------------------Update UI-------------------
  // Show inputted city in UI
  city.addEventListener('change', event => {
    const result = document.querySelector('.dest-result');
    result.textContent = `${event.target.value}`;
  });

  // Show inputted return date in UI
  departureDate.addEventListener('change', event => {
    const result = document.querySelector('.date-result');
    result.textContent = `${event.target.value}`;
  });
  // Show inputted departure date in UI
  returnDate.addEventListener('change', event => {
    const result = document.querySelector('.date2-result');
    result.textContent = `${event.target.value}`;
    if (departureDate.value) {
    }
  });
  // // Show trip duration in UI
  // inputDate.addEventListener('change', event => {
  //   const result = document.querySelector('.duration-result');
  //   result.textContent = `${event.target.value}`;
  // });
}

export { updateUI };
