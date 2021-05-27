const dynamicDisplay = () => {
  const displayDivs = document.querySelectorAll('.dyn-disp');
  const button = document.getElementById('submitbtn');

  button.addEventListener('click', function() {
    displayDivs.forEach(div => {
      div.classList.remove('hidden');
    });
  });
};

export { dynamicDisplay };
