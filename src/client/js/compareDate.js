const compareDate = () => {
  const departureDate = document.getElementById('date').value;
  const returnDate = document.getElementById('date-return').value;
  const duration = document.querySelector('.duration-result');

  // ------------------calculate difference between UI dates-------------------
  const depDate = new Date(departureDate);
  const retDate = new Date(returnDate);

  // Taken from https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
  const msPerDay = 1000 * 60 * 60 * 24;

  // a and b are javascript Date objects
  function dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / msPerDay);
  }
  // test it
  const difference = dateDiffInDays(depDate, retDate);
  return (duration.innerHTML = `${difference} day/s`);
};

export { compareDate };
