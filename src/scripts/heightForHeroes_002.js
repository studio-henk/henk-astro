const heightForHeroes = {
  name: "heightForHeroes",
  version: "002",
  navBarSelector: document.querySelector("section.navigation"),
  init: function() {
    // run functions for observers
    this.navBarObserver();
  },
  navBarObserver: function() {
    // create observer
    const myNavBarObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        heightForHeroes.navBarHeight = entry.target.clientHeight;
        heightForHeroes.navBarHeightBorder = entry.target.getBoundingClientRect().height;
        heightForHeroes.setCSSProp();
      });
    });

    myNavBarObserver.observe(this.navBarSelector);
  },
  setCSSProp: function() {
    let heightForHeroesCssProp = this.navBarHeightBorder;
    document.documentElement.style.setProperty("--size-height-for-hero", heightForHeroesCssProp + "px");
  }
};
heightForHeroes.init();