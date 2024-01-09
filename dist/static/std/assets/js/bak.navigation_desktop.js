// elements
// const htmlElement = document.documentElement;
const rootElementDesktop = document.documentElement;
const mastheadDesktop = document.querySelector(".masthead-desktop");
const primaryNavLinks = document.querySelectorAll(
  ".masthead-desktop .primary-nav .hoverlink",
);
const categoryLinks = document.querySelectorAll(
  ".masthead-desktop .category__link",
);
const categoryCloseLinks = document.querySelectorAll(
  ".masthead-desktop .category__close-link",
);
const categoryGallery = document.querySelectorAll(
  ".masthead-desktop .category__gallery",
);
const primaryNavGalleries = document.querySelectorAll(
    ".masthead-desktop .submenu .category__gallery:first-child",
);
// console.log(primaryNavGalleries);
// console.log(categoryGallery);
let menuOpen = false;

// LISTENERS

// when mouse enters masthead-desktop
mastheadDesktop.addEventListener("mouseenter", function () {
  // console.log("mouse entered the masthead-desktop");
  if (!menuOpen) {
    invertMainNav();
  }
});

// when mouse leaves masthead-desktop
mastheadDesktop.addEventListener("mouseleave", function () {
  mastheadDesktop.classList.remove("--masthead-desktop-hovered");
  if (menuOpen) {
    fadeOutSubmenu();
  }
});

// primary nav links that have a submenu
primaryNavLinks.forEach(
  function (currentElement, currentIndex) {
    // disable clicking on these
    currentElement.addEventListener("click", function (event) {
      event.preventDefault();
    });

    // set mouse over listener
    currentElement.addEventListener("mouseover", function (event) {
      handlePrimaryLinks(currentElement, currentIndex, event);
    });
  },
);

categoryLinks.forEach(function (currentElement, currentIndex) {
  // handle clicking on these
  currentElement.addEventListener("click", function (event) {
    event.preventDefault();
    openCategorySubmenu(currentIndex, currentElement);
  });
});

categoryCloseLinks.forEach(function (currentElement, currentIndex) {
  // handle clicking on these
  currentElement.addEventListener("click", function (event) {
    event.preventDefault();
    closeCategorySubmenu(currentIndex, currentElement);
  });
});

// FUNCTIONS

// MainNav
function invertMainNav() {
  mastheadDesktop.classList.add("--masthead-desktop-hovered");
}

function handlePrimaryLinks(currentElement, currentIndex, event) {
  event.preventDefault();
  // check if already open ie has class --hoverlink-active
  if (!currentElement.classList.contains("--hoverlink-active")) {
    // deactivate any open active link
    const activeLink = mastheadDesktop.querySelector(".--hoverlink-active");
    if (activeLink != null) {
      activeLink.classList.remove("--hoverlink-active");
    }

    // add class active to current hovered one
    currentElement.classList.add("--hoverlink-active");

    const anyOpenSubmenus = mastheadDesktop.querySelector(".--submenu-open");
    if (anyOpenSubmenus != null) {
      anyOpenSubmenus.classList.remove("--submenu-open");
    } else {
      fadeInSubmenu(currentIndex);
    }

    mastheadDesktop
      .querySelectorAll(".submenu")
      [currentIndex].classList.add("--submenu-open");

    // activate first gallery for this menu
    resetPrimaryNavGallery();

    const currentActiveCategory = document.querySelector('.--category-active');
    closeCategorySubmenu(currentActiveCategory);
    showPrimaryNavGallery(currentIndex);
  }
}

function fadeInSubmenu(currentIndex) {
  mastheadDesktop.querySelectorAll(".submenu")[currentIndex].classList.add("--submenu-fade-in");
  mastheadDesktop.querySelectorAll(".submenu")[currentIndex].addEventListener("animationend", fadeInEnded, false);
  rootElementDesktop.classList.add("--desktop-menu-open");
  menuOpen = true;
}

function fadeInEnded() {
  mastheadDesktop
    .querySelector(".--submenu-fade-in")
    .removeEventListener("animationend", fadeInEnded, false);
  mastheadDesktop
    .querySelector(".--submenu-fade-in")
    .classList.remove("--submenu-fade-in");
}

function fadeOutSubmenu() {
  const currentlyOpenSubmenu = mastheadDesktop.querySelector(".--submenu-open");
  if (currentlyOpenSubmenu != null) {
    // console.log("fading submenu out");
    mastheadDesktop
      .querySelector(".--submenu-open")
      .classList.add("--submenu-fade-out");
    mastheadDesktop
      .querySelector(".--submenu-open.--submenu-fade-out")
      .addEventListener("animationend", fadeOutEnded, false);
  }
}

function fadeOutEnded() {
  // console.log("fade out ended");
  mastheadDesktop
    .querySelector(".--submenu-fade-out")
    .removeEventListener("animationend", fadeOutEnded, false);
  mastheadDesktop
    .querySelector(".--submenu-fade-out")
    .classList.remove("--submenu-fade-out");
  mastheadDesktop
    .querySelector(".--submenu-open")
    .classList.remove("--submenu-open");
  mastheadDesktop
    .querySelector(".--hoverlink-active")
    .classList.remove("--hoverlink-active");
  rootElementDesktop.classList.remove("--desktop-menu-open");
  menuOpen = false;
  // close any open submenu under Shop
  closeCategorySubmenu();
}

function openCategorySubmenu(currentIndex, currentElement) {
  resetActiveCategory();
  currentElement.classList.add("--category-active");
  showCorrespondingGallery(currentIndex);
}

function closeCategorySubmenu(currentIndex, currentElement) {
  if (currentElement) {
    currentElement.previousElementSibling.classList.remove("--category-active");
    resetGallery();
    currentElement.parentElement.parentElement.parentElement.nextElementSibling.querySelector(".category__gallery:first-child").classList.add("--category-gallery-active");
  } else {
    resetActiveCategory();
    resetGallery();
  }
}

function showCorrespondingGallery(currentIndex) {
  let galleryIndex = currentIndex + 1;
  const currentActiveGallery = document.querySelector(".--category-gallery-active");
  if (currentActiveGallery) {
    currentActiveGallery.classList.remove("--category-gallery-active");
  }
  categoryGallery[galleryIndex].classList.add("--category-gallery-active");
}

function showPrimaryNavGallery(currentIndex) {
  primaryNavGalleries[currentIndex].classList.add("--category-gallery-active");
}

function resetActiveCategory() {
  const allActiveCategories = document.querySelectorAll(".--category-active");
  // console.log(allActiveCategories);
  if (allActiveCategories.length > 0) {
    allActiveCategories.forEach(
      function (currentActiveCategory ) {
        currentActiveCategory.classList.remove("--category-active");
      },
    );
  }
}

function resetGallery() {
  const allActiveGalleries = document.querySelectorAll(".--category-gallery-active");
  if (allActiveGalleries.length > 0) {
    allActiveGalleries.forEach(
        function (currentActiveGallery ) {
          currentActiveGallery.classList.remove("--category-gallery-active");
        },
    );
  }
}

function resetPrimaryNavGallery() {
  primaryNavGalleries.forEach(
      function (currentActiveGallery) {
        currentActiveGallery.classList.remove("--category-gallery-active");
      },
  );
}