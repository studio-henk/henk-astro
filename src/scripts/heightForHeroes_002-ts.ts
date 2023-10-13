namespace heightForHeroes {
    export const module = {
        name: "heightForHeroes",
        version: "002",
        navBarSelector: document.querySelector("section.navigation") as Element | null,

        init: function() {
            if (this.navBarSelector !== null) {
                this.navBarObserver();
            } else {
                console.log("Nav bar element not found.");
            }
        },

        navBarObserver: function() {
            const myNavBarObserver = new ResizeObserver(entries => {
                entries.forEach(entry => {
                    this.navBarHeight = entry.target.clientHeight;
                    this.navBarHeightBorder = entry.target.getBoundingClientRect().height;
                    this.setCSSProp();
                });
            });

            if (this.navBarSelector !== null) {
                myNavBarObserver.observe(this.navBarSelector);
            }
        },

        setCSSProp: function() {
            let heightForHeroesCssProp = this.navBarHeightBorder;
            document.documentElement.style.setProperty("--size-height-for-hero", heightForHeroesCssProp + "px");
        }
    };
}

// Initialize the module
heightForHeroes.module.init();