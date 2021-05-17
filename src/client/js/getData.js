function getData() {
  // Get user input from UI
  const city = document.getElementById('city').value;
  const userDateInput = document.getElementById('date').value;

  // Convert input to javascript date
  const date = new Date(userDateInput);

  // Today's date variable to return as part of data output object
  const today = Date();

  // Output object
  let cityAndDate = {
    userCity: city,
    todayDate: today,
    userDate: date
  };

  // Validation logic
  // This isn't working 100% - the input field doesn't take same day entries
  // You should refactor this function to make the validation more robust
  if (city != '' && Date.parse(date) > Date.now()) {
    return cityAndDate;
  } else {
    alert(
      `Please enter the city you are travelling to. Please make sure you enter your date of travel and that it is a future date`
    );
  }
}

export { getData };
