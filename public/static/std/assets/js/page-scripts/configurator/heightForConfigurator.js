const heightForConfigurator = {
  name: "heightForConfigurator",
  configuratorViewSelector: document.querySelector(".configurator__view"),
  // navBarSelector: document.querySelector("section.navigation"),
  init: function() {
    // run functions for observers
    this.confViewObserver();
  },
  confViewObserver: function() {
    // create observer
    const myConfViewObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        heightForConfigurator.confViewHeight = entry.target.clientHeight;
        heightForConfigurator.setCSSProp();
      });
    });

    myConfViewObserver.observe(this.configuratorViewSelector);
  },
  setCSSProp: function() {
    let heightForConfCssProp = this.confViewHeight;
    document.documentElement.style.setProperty("--size-height-for-configurator", heightForConfCssProp + "px");
  }
};
heightForConfigurator.init();