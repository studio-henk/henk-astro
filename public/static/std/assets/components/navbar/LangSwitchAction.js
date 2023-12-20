const langSwitches = document.querySelectorAll("lang-switch");

langSwitches.forEach(function (currentElement) {
  // console.log('currentElement:', currentElement);
  const url = currentElement.dataset.url;
  currentElement.addEventListener("click", function () {
    setTimeout(handleSwitch, 300, url);
  });
});

function handleSwitch(url) {
  // console.log('handleSwitch called');
  document.location.assign(url);
}