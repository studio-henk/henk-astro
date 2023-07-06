const setVideoHeight = {

    init: function () {
        let msgBarHeight = document.querySelector('#msg-covid').clientHeight;
        let navBarHeight = document.querySelector('section.navigation').clientHeight;
        let sumHeight = msgBarHeight + navBarHeight;
        // calc will be 100vh - sumheight
        document.querySelector('#hero video').style.height = "calc(100vh - " + sumHeight + "px)";
    }
};
