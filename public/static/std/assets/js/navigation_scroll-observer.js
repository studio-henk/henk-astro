const SOmastheadMobile = document.querySelector(".masthead-mobile");
const SOmastheadDesktop = document.querySelector(".masthead-desktop");
// checking if doc has scrolled
let observer = new IntersectionObserver(entries => {
    if (entries[0].boundingClientRect.y < 0) {
        SOmastheadMobile.classList.add("--status-scrolled");
        SOmastheadDesktop.classList.add("--status-scrolled");
    } else {
        SOmastheadMobile.classList.remove("--status-scrolled");
        SOmastheadDesktop.classList.remove("--status-scrolled");
    }
});
observer.observe(document.querySelector("#pixel-to-watch"));