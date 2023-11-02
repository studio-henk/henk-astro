const heightForHeroes = {
  name: "heightForHeroes",
  // msgBarSelector: document.querySelector("#msg-covid"),
  navBarSelector: document.querySelector("section.navigation"),
  init: function() {
    // run functions for observers
    this.msgBarObserver();
    this.navBarObserver();
  },
  msgBarObserver: function() {
    // create observer
    const myMsgBarObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        heightForHeroes.msgBarHeight = entry.target.clientHeight;
        heightForHeroes.setCSSProp();
      });
    });

    myMsgBarObserver.observe(this.msgBarSelector);
  },
  navBarObserver: function() {
    // create observer
    const myNavBarObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        heightForHeroes.navBarHeight = entry.target.clientHeight;
        heightForHeroes.setCSSProp();
      });
    });

    myNavBarObserver.observe(this.navBarSelector);
  },
  setCSSProp: function() {
    let heightForHeroesCssProp = this.msgBarHeight + this.navBarHeight;
    document.documentElement.style.setProperty("--size-height-for-hero", heightForHeroesCssProp + "px");
  }
};
heightForHeroes.init();