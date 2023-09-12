// elements
const rootElementMobile = document.documentElement;
const mastheadMobile = document.querySelector("#mastheadMobile-mobile");
//const navBtn = document.querySelector('hamburger-button');
const backLinks = document.querySelectorAll(".--back");
const level1SubviewLinks = document.querySelectorAll(
  ".--nav-level1 > .--has-submenu > .subview-link",
);
const level2SubviewLinks = document.querySelectorAll(
  ".--nav-level2 > .--has-submenu > .subview-link",
);

// event-handlers

// menu button
navBtn.addEventListener("click", () => {
  // navBtn.setAttribute('aria-expanded', navBtn.getAttribute('aria-expanded') === 'false' ? 'true' : 'false')
  // toggle class on html?
  rootElementMobile.classList.toggle("--menu-open");
  if (mastheadMobile.classList.contains("--moveToLevel2")) {
    mastheadMobile.classList.remove("--moveToLevel2");
  } else if (mastheadMobile.classList.contains("--moveToLevel3")) {
    mastheadMobile.classList.remove("--moveToLevel3");
  }

  if (rootElementMobile.classList.contains("--menu-open")) {
    // run list items thingy
    ListItemsAnimateIn();
  } else {
    console.log("no way");
    ListItemsReset();
  }
});

// level 1
level1SubviewLinks.forEach(function (currentElement, currentIndex, listObj) {
  currentElement.addEventListener("click", function (e) {
    handleLevel1Links(currentElement);
  });
});

// level 2
level2SubviewLinks.forEach(function (currentElement, currentIndex, listObj) {
  currentElement.addEventListener("click", function (e) {
    handleLevel2Links(currentElement);
  });
});

// back links
backLinks.forEach(function (currentElement, currentIndex, listObj) {
  currentElement.addEventListener("click", function (e) {
    handleBackLinks(currentElement);
  });
});

function ListItemsAnimateIn() {
  const MainListItems = document.querySelectorAll(
    ".nav-bar-mobile__link-list.--nav-level1 > li",
  );
  // nodelist
  MainListItems.forEach(function (currentElement, currentIndex, listObj) {
    // console.log(currentElement);
    // console.log(currentIndex);
    currentElement.style.opacity = 1;
    currentElement.style.transitionDelay = (currentIndex + 1) * 0.15 + "s";
  });
}

function ListItemsReset() {
  const MainListItems = document.querySelectorAll(
    ".nav-bar-mobile__link-list.--nav-level1 > li",
  );

  MainListItems.forEach(function (currentElement, currentIndex, listObj) {
    currentElement.removeAttribute("style");
  });
}

function handleLevel1Links(currentElement) {
  event.preventDefault();
  // remove class --active everywhere?
  mastheadMobile
    .querySelectorAll(".--active")
    .forEach(function (currentElement, currentIndex, listObj) {
      currentElement.classList.remove("--active");
    });

  // add --active
  currentElement.classList.add("--active");

  // tell parent to move?
  mastheadMobile.classList.add("--moveToLevel2");
}

function handleLevel2Links(currentElement) {
  event.preventDefault();

  // add --active
  currentElement.classList.add("--active");

  // tell parent to move?
  mastheadMobile.classList.remove("--moveToLevel2");
  mastheadMobile.classList.add("--moveToLevel3");
}

function handleBackLinks(currentElement) {
  event.preventDefault();
  // TODO: make general? get level number by active class ?
  if (mastheadMobile.classList.contains("--moveToLevel2")) {
    mastheadMobile.classList.remove("--moveToLevel2");
  } else if (mastheadMobile.classList.contains("--moveToLevel3")) {
    mastheadMobile.classList.remove("--moveToLevel3");
    mastheadMobile.classList.add("--moveToLevel2");
  }
  // only remove active from current level
  currentElement.parentElement.parentElement.parentElement
    .querySelector(".--active")
    .classList.remove("--active");
}