const portraitOnLoad = window.matchMedia("(orientation: portrait)").matches;
// console.log("portraitOnLoad: " + portraitOnLoad);
if (portraitOnLoad) {
  // do something
  // console.log("portrait mode");
  document
    .querySelector(".configurator__grid")
    .classList.remove("configurator__grid--is-landscape");
} else {
  // do something else
  // console.log("landscape mode");
  document.querySelector(".configurator__grid").classList.add("configurator__grid--is-landscape");
}

window.matchMedia("(orientation: portrait)").addEventListener("change", (e) => {
  const portrait = e.matches;

  if (portrait) {
    // do something
    // console.log("portrait mode");
    document
      .querySelector(".configurator__grid")
      .classList.remove("configurator__grid--is-landscape");
  } else {
    // do something else
    // console.log("landscape mode");
    document
      .querySelector(".configurator__grid")
      .classList.add("configurator__grid--is-landscape");
  }
});