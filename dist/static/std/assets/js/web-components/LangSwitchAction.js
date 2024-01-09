console.log('hello lang-switch-action');

const langSwitches = document.querySelectorAll("lang-switch");
langSwitches.forEach(function (currentElement) {
  const url = currentElement.dataset.url;
  currentElement.addEventListener("click", function () {
    setTimeout(handleSwitch, 300, url);
  });
});

function handleSwitch(url) {
  document.location.assign(url);
}