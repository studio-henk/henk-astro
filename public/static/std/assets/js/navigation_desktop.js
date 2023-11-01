const navBarDesktop = {
  name: "navBarDesktop",
  menuOpen: false,
  rootElementDesktop: document.documentElement,
  bodyElement: document.querySelector("body"),
  mastheadDesktop: document.querySelector(".masthead-desktop"),
  primaryNavLinks: document.querySelectorAll(
    ".masthead-desktop .primary-nav .hoverlink"
  ),
  subMenuOpenLinks: document.querySelectorAll(".submenu__open-link"),
  subMenuCloseLinks: document.querySelectorAll(".submenu__close-link"),
  categoryGallery: document.querySelectorAll(
      ".masthead-desktop .category__gallery",
  ),
  init: function () {
    console.log("init called");

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
      const isSubmenuSubmenuOpen = document.querySelector(".submenu__open-link.--is-active");
      // console.log(isSubmenuSubmenuOpen);
      if (isSubmenuSubmenuOpen) {
        navBarDesktop.resetGallery();
        navBarDesktop.resetActiveSubmenu();
      }
    });

    // primary nav links that have a submenu
    navBarDesktop.primaryNavLinks.forEach(function (
      currentElement,
      currentIndex
    ) {
      // disable clicking on these
      currentElement.addEventListener("click", function (event) {
        event.preventDefault();
      });

      // set mouse over listener
      currentElement.addEventListener("mouseover", function (event) {
        navBarDesktop.handlePrimaryLinks(currentElement, currentIndex, event);
      });
    });
  },
  invertMainNav: function () {
    navBarDesktop.mastheadDesktop.classList.add("--masthead-desktop-hovered");
  },
  handlePrimaryLinks: function (currentElement, currentIndex, event) {
    // console.log("hello: CI: " + currentIndex);
    event.preventDefault();
    // check if already open ie has class --hoverlink-active
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

      // check if a submenu submenu left open
      // if so then close it
      // and restore its gallery to index 0
      const isSubmenuSubmenuOpen = document.querySelector(".submenu__open-link.--is-active");
      // console.log(isSubmenuSubmenuOpen);
      if (isSubmenuSubmenuOpen) {
        navBarDesktop.resetGallery();
        navBarDesktop.resetActiveSubmenu();
      }

      const anyOpenSubmenus =
        navBarDesktop.bodyElement.querySelector(".--submenu-open");
      if (anyOpenSubmenus != null) {
        anyOpenSubmenus.classList.remove("--submenu-open");
      } else {
        navBarDesktop.fadeInSubmenu(currentIndex);
      }

      // add open class to this submenu
      navBarDesktop.bodyElement
        .querySelectorAll(".dt-submenu")
        [currentIndex].classList.add("--submenu-open");

      // event handlers for submenu open links
      // console.log(navBarDesktop.subMenuOpenLinks);
      const currentOpenSubMenuOpenLinks = document.querySelectorAll(
        ".--submenu-open .submenu__open-link"
      );
      const currentOpenSubMenuCloseLinks = document.querySelectorAll(
        ".--submenu-open .submenu__close-link"
      );
      /*console.log(currentOpenSubMenuOpenLinks);*/
      currentOpenSubMenuOpenLinks.forEach(function (
        currentElement,
        currentIndex
      ) {
        // handle clicking on these
        currentElement.addEventListener("click", function (event) {
          event.preventDefault();
          navBarDesktop.openSubmenuSubmenu(currentIndex, currentElement);
        });
      });

      // event handlers for submenu close links
      currentOpenSubMenuCloseLinks.forEach(function (
        currentElement,
        currentIndex
      ) {
        // handle clicking on these
        currentElement.addEventListener("click", function (event) {
          event.preventDefault();
          navBarDesktop.closeSubmenuSubmenu(currentIndex, currentElement);
        });
      });
    }
  },
  resetActiveSubmenu: function () {
    if (document.querySelector(".dt-submenu .--is-active")) {
      document
        .querySelector(".dt-submenu .--is-active")
        .classList.remove("--is-active");
    }
  },
  openSubmenuSubmenu: function (currentIndex, currentElement) {
    // console.log(currentIndex);
    navBarDesktop.resetActiveSubmenu();

    currentElement.classList.add("--is-active");
    navBarDesktop.showCorrespondingGallery(currentIndex);
  },
  closeSubmenuSubmenu: function (currentIndex, currentElement) {
    // console.log('close triggerd');
    if (currentElement) {
      // currentElement.previousElementSibling.classList.remove("--is-active");
      // remove is-active class from open/close link
      navBarDesktop.resetActiveSubmenu();
      // de-activate other gallery in this submenu
      currentElement.parentElement.parentElement.parentElement.nextElementSibling.querySelector(".--category-gallery-active").classList.remove("--category-gallery-active");
      // reset first gallery to active
      currentElement.parentElement.parentElement.parentElement.nextElementSibling.querySelector(".category__gallery:first-child").classList.add("--category-gallery-active");
    } else {
      navBarDesktop.resetActiveSubmenu();
      /*navBarDesktop.resetActiveGallery();*/
      console.log("what????");
    }
  },
  showCorrespondingGallery: function (currentIndex) {
    // console.log('showCorrespondingGallery: ' + currentIndex);
    let galleryIndex = currentIndex + 1;
    /*let galleryIndex = currentIndex;*/
    const currentOpenSubmenu = document.querySelector(".--submenu-open");
    /*const currentActiveGallery = document.querySelector(".--category-gallery-active");*/
    const currentActiveGallery = currentOpenSubmenu.querySelector(".--category-gallery-active");
    // console.log(currentActiveGallery);
    if (currentActiveGallery) {
      currentActiveGallery.classList.remove("--category-gallery-active");
    }
    // find the right gallery to show inside this
    currentOpenSubmenu.querySelectorAll(".category__gallery")[galleryIndex].classList.add("--category-gallery-active");
  },
  resetGallery: function () {
    // de-activate other gallery in this submenu
    // currentElement.parentElement.parentElement.parentElement.nextElementSibling.querySelector(".--category-gallery-active").classList.remove("--category-gallery-active");
    // reset first gallery to active
    //  currentElement.parentElement.parentElement.parentElement.nextElementSibling.querySelector(".category__gallery:first-child").classList.add("--category-gallery-active");
    const ActiveGallery = document.querySelector(".--submenu-open .--category-gallery-active");
    ActiveGallery.classList.remove("--category-gallery-active");
    // set first gallery for this submenu active again
    document.querySelectorAll(".--submenu-open .category__gallery")[0].classList.add("--category-gallery-active");
  },
  fadeInSubmenu: function (currentIndex) {
    // console.log("fadeInSub called");
    navBarDesktop.bodyElement
      .querySelectorAll(".dt-submenu")
      [currentIndex].classList.add("--submenu-fade-in");
    navBarDesktop.bodyElement
      .querySelectorAll(".dt-submenu")
      [currentIndex].addEventListener(
        "animationend",
        navBarDesktop.fadeInEnded,
        false
      );
    navBarDesktop.rootElementDesktop.classList.add("--desktop-menu-open");
    /*menuOpen = true;*/
    // console.log("is navBarDesktop.menuOpen: " + navBarDesktop.menuOpen);
  },
  fadeInEnded: function () {
    // console.log("fadeInEnded called");
    navBarDesktop.bodyElement
      .querySelector(".--submenu-fade-in")
      .removeEventListener("animationend", navBarDesktop.fadeInEnded, false);
    navBarDesktop.bodyElement
      .querySelector(".--submenu-fade-in")
      .classList.remove("--submenu-fade-in");
    navBarDesktop.menuOpen = true;
    // console.log("navBarDesktop.menuOpen: " + navBarDesktop.menuOpen);
  },
  fadeOutSubmenu: function () {
    // console.log("fadeOutSubmenu called");
    const currentlyOpenSubmenu =
      navBarDesktop.bodyElement.querySelector(".--submenu-open");
    if (currentlyOpenSubmenu != null) {
      // console.log("fading submenu out");
      navBarDesktop.bodyElement
        .querySelector(".--submenu-open")
        .classList.add("--submenu-fade-out");
      navBarDesktop.bodyElement
        .querySelector(".--submenu-open.--submenu-fade-out")
        .addEventListener("animationend", navBarDesktop.fadeOutEnded, false);
    }
    // console.log("navBarDesktop.menuOpen: " + navBarDesktop.menuOpen);
  },
  fadeOutEnded: function () {
    // console.log("fade out ended");
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
    // menuOpen = false;
    navBarDesktop.menuOpen = false;
    // console.log("navBarDesktop.menuOpen: " + navBarDesktop.menuOpen);
    // close any open submenu under Shop
    // closeSubmenuSubmenu();
    navBarDesktop.resetActiveSubmenu();
  },
};

navBarDesktop.init();