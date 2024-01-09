const navBarDesktop = {
  name: "navBarDesktop",
  menuOpen: false,
  hasEventListener: false,
  subMenus: [],
  rootElementDesktop: document.documentElement,
  bodyElement: document.querySelector("body"),
  mastheadDesktop: document.querySelector(".masthead-desktop"),
  primaryNavLinks: document.querySelectorAll(
    ".masthead-desktop .primary-nav .hoverlink"
  ),
  subMenuOpenLinks: document.querySelectorAll(".submenu__open-link"),
  subMenuCloseLinks: document.querySelectorAll(".submenu__close-link"),
  tertiaryNavOpenLinks: document.querySelectorAll(
    ".masthead-desktop .tertiary-navigation .tertiary-navigation__button--open"
  ),
  tertiaryNavCloseLinks: document.querySelectorAll(
    ".masthead-desktop .tertiary-navigation .tertiary-navigation__button--close"
  ),
  categoryGallery: document.querySelectorAll(
    ".masthead-desktop .category__gallery"
  ),
  init: function () {
    console.log("init called");
    // console.log(navBarDesktop.subMenus);
    // let hasEventListener = false;

    // LISTENERS

    // when mouse enters masthead-desktop
    navBarDesktop.mastheadDesktop.addEventListener("mouseenter", function () {
      if (!navBarDesktop.menuOpen) {
        navBarDesktop.invertMainNav();
      }
    });

    // when mouse leaves masthead-desktop
    navBarDesktop.mastheadDesktop.addEventListener("mouseleave", function () {
      navBarDesktop.mastheadDesktop.classList.remove(
        "--masthead-desktop-hovered"
      );
      if (navBarDesktop.menuOpen) {
        navBarDesktop.fadeOutSubmenu();
      }
      // check if a submenu submenu left open
      // if so then close it
      // and restore its gallery to index 0
      const isSubmenuSubmenuOpen = document.querySelector(
        ".submenu__open-link.--is-active"
      );
      if (isSubmenuSubmenuOpen) {
        navBarDesktop.resetGallery();
        navBarDesktop.resetActiveSubmenuSubmenu();
      }
      navBarDesktop.closeTertiaryNavAndGallery();
    });

    // primary nav links that have a submenu
    navBarDesktop.primaryNavLinks.forEach(function (
      currentElement,
      primaryNavIndex
    ) {
      // disable clicking on these
      currentElement.addEventListener("click", function (event) {
        event.preventDefault();
      });

      // set mouse over listener
      currentElement.addEventListener("mouseover", function (event) {
        navBarDesktop.handlePrimaryLinks(
          currentElement,
          primaryNavIndex,
          event
        );
      });

      // set the submenu handler data her
      // Create a new submenu
      const newSubmenu = {
        hasEventListener: false,
      };

      // Add the new submenu to the array
      navBarDesktop.subMenus[primaryNavIndex] = newSubmenu;
    });

    // Tertiary Nav Open Links
    navBarDesktop.tertiaryNavOpenLinks.forEach(function (
      currentElement,
      currentIndex
    ) {
      currentElement.addEventListener("click", function (event) {
        navBarDesktop.handleTertiaryNavOpen(
          currentElement,
          currentIndex,
          event
        );
      });
    });

    // Tertiary Nav Close Links
    navBarDesktop.tertiaryNavCloseLinks.forEach(function (
      currentElement,
      currentIndex
    ) {
      currentElement.addEventListener("click", function (event) {
        navBarDesktop.handleTertiaryNavClose(
          currentElement,
          currentIndex,
          event
        );
      });
    });
  },
  invertMainNav: function () {
    navBarDesktop.mastheadDesktop.classList.add("--masthead-desktop-hovered");
  },
  handlePrimaryLinks: function (currentElement, primaryNavIndex, event) {
    event.preventDefault();
    if (!currentElement.classList.contains("--hoverlink-active")) {
      // deactivate any open active link
      const activeLink = navBarDesktop.mastheadDesktop.querySelector(
        ".--hoverlink-active"
      );
      if (activeLink != null) {
        activeLink.classList.remove("--hoverlink-active");
      }
      // add class active to current hovered one
      currentElement.classList.add("--hoverlink-active");

      // move this !
      // check if a submenu submenu left open
      // if so then close it
      // and restore its gallery to index 0
      const isSubmenuSubmenuOpen = document.querySelector(
        ".submenu__open-link.--is-active"
      );
      if (isSubmenuSubmenuOpen) {
        navBarDesktop.resetGallery();
        navBarDesktop.resetActiveSubmenuSubmenu();
        navBarDesktop.closeTertiaryNavAndGallery();
      }

      // clear / close any open submenus
      navBarDesktop.closeSubmenu(primaryNavIndex);

      // open the submenu by index
      navBarDesktop.openSubmenu(primaryNavIndex);
    }
  },
  openSubmenu: function (primaryNavIndex) {
    // add open class to this submenu
    navBarDesktop.bodyElement
      .querySelectorAll(".dt-submenu")
      [primaryNavIndex].classList.add("--submenu-open");
    if (!navBarDesktop.subMenus[primaryNavIndex].hasEventListener) {
      navBarDesktop.setHandlersForSubmenu(primaryNavIndex);
    }
  },
  setHandlersForSubmenu: function (primaryNavIndex) {
    const openSubmenu =
      navBarDesktop.bodyElement.querySelectorAll(".dt-submenu")[
        primaryNavIndex
      ];
    // get the open links for this submenu
    const openSubmenuOpenLinks = openSubmenu.querySelectorAll(
      ".submenu__open-link"
    );
    // set event handler
    if (openSubmenuOpenLinks.length > 0) {
      openSubmenuOpenLinks.forEach(function (
        currentElement,
        subMenuOpenLinksIndex
      ) {
        const openSubmenuFunc = function (event) {
          event.preventDefault();
          navBarDesktop.openSubmenuSubmenu(
            subMenuOpenLinksIndex,
            currentElement,
            event
          );
        };
        currentElement.addEventListener("click", openSubmenuFunc);
        // add to array
        const newSubmenu = {
          hasEventListener: true,
        };
        navBarDesktop.subMenus[primaryNavIndex] = newSubmenu;
      });
    }

    // get the close links for this submenu
    const submenuCloseLinks = openSubmenu.querySelectorAll(
      ".submenu__close-link"
    );

    // set event handler
    if (submenuCloseLinks.length > 0) {
      submenuCloseLinks.forEach(function (
        currentElement,
        submenuCloseLinksIndex
      ) {
        const closeSubmenuFunc = function (event) {
          event.preventDefault();
          navBarDesktop.closeSubmenuSubmenu(
            submenuCloseLinksIndex,
            currentElement,
            event
          );
        };
        currentElement.addEventListener("click", closeSubmenuFunc);
        // navBarDesktop.hasEventListener = true;
      });
    }
  },
  closeSubmenu: function (primaryNavIndex) {
    const anyOpenSubmenus =
      navBarDesktop.bodyElement.querySelector(".--submenu-open");
    if (anyOpenSubmenus != null) {
      anyOpenSubmenus.classList.remove("--submenu-open");
    } else {
      navBarDesktop.fadeInSubmenu(primaryNavIndex);
    }
  },
  //TODO: still used??
  resetActiveSubmenuSubmenu: function () {
    // console.log(document.querySelector(".dt-submenu .--is-active"));
    if (document.querySelector(".dt-submenu .--is-active")) {
      document
        .querySelector(".dt-submenu .--is-active")
        .classList.remove("--is-active");
    }
    navBarDesktop.closeTertiaryNavAndGallery();
  },
  openSubmenuSubmenu: function (subMenuOpenLinksIndex, currentElement) {
    navBarDesktop.resetActiveSubmenuSubmenu();
    currentElement.classList.add("--is-active");
    navBarDesktop.showCorrespondingGallery(subMenuOpenLinksIndex);
  },
  closeSubmenuSubmenu: function (subMenuOpenLinksIndex, currentElement) {
    // console.log(currentIndex);
    // console.log(subMenuOpenLinksIndex);
    if (currentElement) {
      navBarDesktop.resetActiveSubmenuSubmenu();
      currentElement.parentElement.parentElement.parentElement.nextElementSibling
        .querySelector(".--category-gallery-active")
        .classList.remove("--category-gallery-active");
      currentElement.parentElement.parentElement.parentElement.nextElementSibling
        .querySelector(".category__gallery:first-child")
        .classList.add("--category-gallery-active");
    } else {
      navBarDesktop.resetActiveSubmenuSubmenu();
      console.log("what????");
    }
  },
  showCorrespondingGallery: function (subMenuOpenLinksIndex) {
    // console.log(currentIndex);
    // console.log(subMenuOpenLinksIndex);
    let galleryIndex = subMenuOpenLinksIndex + 1;
    const currentOpenSubmenu = document.querySelector(".--submenu-open");
    const currentActiveGallery = currentOpenSubmenu.querySelector(
      ".--category-gallery-active"
    );
    if (currentActiveGallery) {
      currentActiveGallery.classList.remove("--category-gallery-active");
    }
    // find the right gallery to show inside this
    currentOpenSubmenu
      .querySelectorAll(".category__gallery")
      [galleryIndex].classList.add("--category-gallery-active");
  },
  resetGallery: function () {
    const ActiveGallery = document.querySelector(
      ".--submenu-open .--category-gallery-active"
    );
    ActiveGallery.classList.remove("--category-gallery-active");
    // set first gallery for this submenu active again
    document
      .querySelectorAll(".--submenu-open .category__gallery")[0]
      .classList.add("--category-gallery-active");
  },
  handleTertiaryNavOpen: function (currentElement, currentIndex, event) {
    navBarDesktop.closeTertiaryNavAndGallery();
    currentElement.parentElement.parentElement.setAttribute("open", "");
    navBarDesktop.showTertiaryGallery(currentIndex);
  },
  closeTertiaryNavAndGallery: function () {
    const tertNavs = document.querySelectorAll(".tertiary-navigation");
    const tertNavsOpen = tertNavs.forEach(function (
      tertNavElement,
      tertNavIndex
    ) {
      // check if has open attr
      if (tertNavElement.hasAttribute("open")) {
        tertNavElement.removeAttribute("open");
        navBarDesktop.resetTertiaryGallery(tertNavIndex);
      }
    });
  },
  handleTertiaryNavClose: function (currentElement, currentIndex, event) {
    currentElement.parentElement.parentElement.removeAttribute("open");
    navBarDesktop.resetTertiaryGallery(currentIndex);
  },
  showTertiaryGallery: function (tertiaryGalleryIndex) {
    const tertiaryGalleries = document.querySelectorAll(
      ".tertiary-navigation__gallery"
    );
    tertiaryGalleries[tertiaryGalleryIndex].classList.toggle(
      "tertiary-navigation__gallery--active"
    );
  },
  resetTertiaryGallery: function (tertiaryGalleryIndex) {
    const tertiaryGalleries = document.querySelectorAll(
      ".tertiary-navigation__gallery"
    );
    tertiaryGalleries[tertiaryGalleryIndex].classList.toggle(
      "tertiary-navigation__gallery--active"
    );
  },
  fadeInSubmenu: function (primaryNavIndex) {
    navBarDesktop.bodyElement
      .querySelectorAll(".dt-submenu")
      [primaryNavIndex].classList.add("--submenu-fade-in");
    navBarDesktop.bodyElement
      .querySelectorAll(".dt-submenu")
      [primaryNavIndex].addEventListener(
        "animationend",
        navBarDesktop.fadeInEnded,
        false
      );
    navBarDesktop.rootElementDesktop.classList.add("--desktop-menu-open");
  },
  fadeInEnded: function () {
    navBarDesktop.bodyElement
      .querySelector(".--submenu-fade-in")
      .removeEventListener("animationend", navBarDesktop.fadeInEnded, false);
    navBarDesktop.bodyElement
      .querySelector(".--submenu-fade-in")
      .classList.remove("--submenu-fade-in");
    navBarDesktop.menuOpen = true;
  },
  fadeOutSubmenu: function () {
    const currentlyOpenSubmenu =
      navBarDesktop.bodyElement.querySelector(".--submenu-open");
    if (currentlyOpenSubmenu != null) {
      navBarDesktop.bodyElement
        .querySelector(".--submenu-open")
        .classList.add("--submenu-fade-out");
      navBarDesktop.bodyElement
        .querySelector(".--submenu-open.--submenu-fade-out")
        .addEventListener("animationend", navBarDesktop.fadeOutEnded, false);
    }
  },
  fadeOutEnded: function () {
    navBarDesktop.bodyElement
      .querySelector(".--submenu-fade-out")
      .removeEventListener("animationend", navBarDesktop.fadeOutEnded, false);
    navBarDesktop.bodyElement
      .querySelector(".--submenu-fade-out")
      .classList.remove("--submenu-fade-out");
    navBarDesktop.bodyElement
      .querySelector(".--submenu-open")
      .classList.remove("--submenu-open");
    navBarDesktop.bodyElement
      .querySelector(".--hoverlink-active")
      .classList.remove("--hoverlink-active");
    navBarDesktop.rootElementDesktop.classList.remove("--desktop-menu-open");
    navBarDesktop.menuOpen = false;
    navBarDesktop.resetActiveSubmenuSubmenu();
  },
};

navBarDesktop.init();
