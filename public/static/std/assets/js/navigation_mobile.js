// elements
const rootElement = document.documentElement;
const masthead = document.querySelector("#masthead-mobile");
/*const navBtn = document.querySelector('#menu-btn');*/
/*const navBtn = document.querySelector('#MobileNavButton');*/
const navBtn = document.querySelector("hamburger-button");
const backLinks = document.querySelectorAll(".--back");
const level1SubviewLinks = document.querySelectorAll(
  ".--nav-level1 > .--has-submenu > .subview-link"
);
const level2SubviewLinks = document.querySelectorAll(
  ".--nav-level2 > .--has-submenu > .subview-link"
);

// event-handlers

// menu button
navBtn.addEventListener("click", () => {
  // navBtn.setAttribute('aria-expanded', navBtn.getAttribute('aria-expanded') === 'false' ? 'true' : 'false')
  // toggle class on html?
  rootElement.classList.toggle("--menu-open");
  if (masthead.classList.contains("--moveToLevel2")) {
    masthead.classList.remove("--moveToLevel2");
  } else if (masthead.classList.contains("--moveToLevel3")) {
    masthead.classList.remove("--moveToLevel3");
  }

  if (rootElement.classList.contains("--menu-open")) {
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
    ".nav-bar-mobile__link-list.--nav-level1 > li"
  );
  // nodelist
  MainListItems.forEach(function (currentElement, currentIndex, listObj) {
    // console.log(currentElement);
    // console.log(currentIndex);
    currentElement.style.opacity = 1;
    currentElement.style.transitionDelay = (currentIndex + 1) * 0.15 + "s";
  });
  setHeightLevel2();
}

function ListItemsReset() {
  const MainListItems = document.querySelectorAll(
    ".nav-bar-mobile__link-list.--nav-level1 > li"
  );

  MainListItems.forEach(function (currentElement, currentIndex, listObj) {
    currentElement.removeAttribute("style");
  });
}

function handleLevel1Links(currentElement) {
  event.preventDefault();
  // remove class --active everywhere?
  masthead
    .querySelectorAll(".--active")
    .forEach(function (currentElement, currentIndex, listObj) {
      currentElement.classList.remove("--active");
    });

  // add --active
  currentElement.classList.add("--active");

  // tell parent to move?
  masthead.classList.add("--moveToLevel2");
}

function handleLevel2Links(currentElement) {
  event.preventDefault();

  // add --active
  currentElement.classList.add("--active");

  // tell parent to move?
  masthead.classList.remove("--moveToLevel2");
  masthead.classList.add("--moveToLevel3");
}

function handleBackLinks(currentElement) {
  event.preventDefault();
  // TODO: make general? get level number by active class ?
  if (masthead.classList.contains("--moveToLevel2")) {
    masthead.classList.remove("--moveToLevel2");
  } else if (masthead.classList.contains("--moveToLevel3")) {
    masthead.classList.remove("--moveToLevel3");
    masthead.classList.add("--moveToLevel2");
  }
  // only remove active from current level
  currentElement.parentElement.parentElement.parentElement
    .querySelector(".--active")
    .classList.remove("--active");
}

function setHeightLevel2 () {
  // Select all elements with the specified classes and convert them to an array
  const Level2Elements = Array.from(document.querySelectorAll(".submenu.--nav-level2"));
  /*console.log(Level2Elements);*/

// Find the element with the maximum height using the ES6 arrow function and reduce method
  const maxValueInArray = Level2Elements.reduce((maxElement, currentElement) => {
    const maxHeight = Math.max(maxElement.offsetHeight, currentElement.offsetHeight);
    return maxHeight === maxElement.offsetHeight ? maxElement : currentElement;
  }, Level2Elements[0]);

  console.log("maxValueInArray:" + maxValueInArray);

// Set the height of all elements with the specified classes to 100vh
  Level2Elements.forEach(element => {
    /*element.style.height = "100vh";*/
    /*element.style.height = maxValueInArray.offsetHeight + 69 + "px";*/
    element.style.height = maxValueInArray.offsetHeight + "px";
  });
}