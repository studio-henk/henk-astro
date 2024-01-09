const NCP_mastheadMobile = document.querySelector(".masthead-mobile");
const NCP_mastheadDesktop = document.querySelector(".masthead-desktop");
const NCP_NavBarHeroMobile = NCP_mastheadMobile.getAttribute("data-has-hero");
const NCP_NavBarHeroDesktop = NCP_mastheadDesktop.getAttribute("data-has-hero");

console.log("hero: " + NCP_NavBarHeroDesktop);

// Create a media condition that targets viewports at least 768px wide
const mediaQuery = window.matchMedia("(max-width: 1279px)");
function handleTabletChange(e) {
  // Check if the media query is true
  if (e.matches) {
    if (!NCP_NavBarHeroMobile) {
      document.body.style.paddingTop = NCP_mastheadMobile.clientHeight + "px";
    }
  } else {
    if (!NCP_NavBarHeroDesktop) {
      document.body.style.paddingTop = NCP_mastheadDesktop.clientHeight + "px";
    }
  }
}

// Register event listener
mediaQuery.addEventListener("change", handleTabletChange);

// Initial check
handleTabletChange(mediaQuery);