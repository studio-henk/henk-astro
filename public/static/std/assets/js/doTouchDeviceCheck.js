function doTouchDeviceCheck() {
    var isTouchDevice;
    if(window.matchMedia("(any-hover: none)").matches) {
        isTouchDevice = true;
        // console.log("isTouchDevice " + isTouchDevice);
    } else {
        isTouchDevice = false;
        // console.log("isTouchDevice " + isTouchDevice);
    }
    console.log("isTouchDevice " + isTouchDevice);
    return isTouchDevice;
}