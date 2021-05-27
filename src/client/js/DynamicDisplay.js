const dynamicDisplay = () => {
  const displayDivs = document.querySelectorAll('.dyn-disp');
  const button = document.getElementById('submitbtn');

  displayDivs.forEach(div => {
    div.classList.remove('hidden');
  });
};

export { dynamicDisplay };
