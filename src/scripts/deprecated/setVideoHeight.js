const setVideoHeight = {

    init: function() {
        let msgBarHeight = document.querySelector("#msg-covid").clientHeight;
        let navBarHeight = document.querySelector("section.navigation").clientHeight;
        let sumHeight = msgBarHeight + navBarHeight;
        // calc will be 100vh - sumheight
        let allVideos = document.querySelectorAll(".hero-video-brick video");
        console.log(allVideos);
        allVideos.forEach((element) => {
            element.style.height = "calc(100vh - " + sumHeight + "px)";
        });
    }
};

document.addEventListener("DOMContentLoaded", function() {
    setVideoHeight.init();
});
window.addEventListener("resize", function() {
    setVideoHeight.init();
});