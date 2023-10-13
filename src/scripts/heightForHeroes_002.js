/**
* Represents the 'heightForHeroes' module.
* @namespace
*/
const heightForHeroes = {
  /**
   * The name of the module.
   * @type {string}
   */
  name: "heightForHeroes",

  /**
   * The version of the module.
   * @type {string}
   */
  version: "002",
  /**
   * The selector for the navigation bar.
   * @type {Element}
   */
  navBarSelector: document.querySelector("section.navigation"),

  /**
   * Initializes the 'heightForHeroes' module.
   */
  init: function() {
    // Check if navBarSelector is not null before using it
    if (this.navBarSelector !== null) {
      // Run functions for observers
      this.navBarObserver();
    } else {
      // Handle the case where navBarSelector is null (not found)
      console.log("Nav bar element not found.");
    }
  },

  /**
   * Observes the navigation bar's size changes.
   */
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

  /**
   * Sets a CSS property based on the navigation bar's size.
   */
  setCSSProp: function() {
    let heightForHeroesCssProp = this.navBarHeightBorder;
    document.documentElement.style.setProperty("--size-height-for-hero", heightForHeroesCssProp + "px");
  }
};

// Initialize the module
heightForHeroes.init();