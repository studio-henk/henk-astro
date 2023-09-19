const cmpSheet = {
    name: "cmpSheet",
    sheetOpen: false,
    selector: ".cmp-sheet",
    bodyElement: document.querySelector("body"),
    openButtonElements: document.querySelectorAll(
        '[data-function="openSheet"]'
    ),
    prevScrollPos: 0,
    init: function () {
        // console.log("init called");
        // for each button with data-function="openSheet" add event-listener
        for (let openButtonElement of this.openButtonElements) {
            openButtonElement.addEventListener(
                "click",
                cmpSheet.openSheet,
                false
            );
        }
    },
    openSheet: function (event) {
        // console.log("openSheet called");
        event.preventDefault();
        cmpSheet.sheetElement =
            event.target.parentElement.parentElement.querySelector(
                ".cmp-sheet"
            );

        cmpSheet.overlayElement = cmpSheet.sheetElement.querySelector(
            ".cmp-sheet__overlay"
        );

        // set contentElement
        cmpSheet.contentElement = cmpSheet.sheetElement.querySelector(
            ".cmp-sheet__content"
        );

        // set closeButtonElement
        cmpSheet.closeButtonElement = cmpSheet.sheetElement.querySelector(
            ".sh-atom-button--close"
        );

        // set contentTouchElement
        cmpSheet.contentTouchElement = cmpSheet.sheetElement.querySelector(
            ".cmp-sheet__content-header-touch-target"
        );

        cmpSheet.sheetOpen = true;
        // prevent scrolling on page
        cmpSheet.bodyElement.style.overflow = "hidden";
        cmpSheet.sheetElement.style.display = "flex";
        cmpSheet.bodyElement.style.touchAction = "none";

        // add class open to overlay with a short timeout to start after setting display
        // as non-anonymous function
        setTimeout(cmpSheet.overlayOpen, 2);

        // timeout for slideUp transition
        setTimeout(cmpSheet.slideUpToHalfScreen, 4);

        // add eventListener to close button
        cmpSheet.closeButtonElement.addEventListener(
            "click",
            cmpSheet.closeButtonHandler,
            false
        );
        // add eventListener to background overlay
        cmpSheet.overlayElement.addEventListener(
            "click",
            cmpSheet.closeSheetOnBlur,
            false
        );
        // add eventListener on content sheet for mobile drag touch
        cmpSheet.contentTouchElement.addEventListener(
            "touchstart",
            cmpSheet.touchStart,
            {passive: true}
        );
        cmpSheet.contentTouchElement.addEventListener(
            "touchmove",
            cmpSheet.touchMoveHandler,
            {passive: true}
        );
        cmpSheet.contentTouchElement.addEventListener(
            "touchend",
            cmpSheet.touchEnd,
            {passive: false}
        );
    },
    closeSheet: function () {
        // console.log("closeSheet called");
        cmpSheet.contentElement.classList.remove(
            "cmp-sheet__content--half-screen"
        );
        // remove fullscreen class
        cmpSheet.contentElement.classList.remove(
            "cmp-sheet__content--fullscreen"
        );

        function restoreDoc() {
            // console.log('restoring document');
            cmpSheet.sheetElement.style.display = "none";
            // cmpSheet.bodyElement.style.overflow = "unset";
            // cmpSheet.bodyElement.style.touchAction = "unset";
            cmpSheet.bodyElement.style.removeProperty("overflow");
            cmpSheet.bodyElement.style.removeProperty("touchAction");
            cmpSheet.sheetOpen = false;
        }

        // timeout before closing overlay
        setTimeout(cmpSheet.overlayClose, 400);

        // 3 set display none
        setTimeout(restoreDoc, 600);

        cmpSheet.closeButtonElement.removeEventListener(
            "click",
            cmpSheet.closeButtonHandler,
            false
        );
        cmpSheet.overlayElement.removeEventListener(
            "click",
            cmpSheet.closeSheetOnBlur,
            false
        );
        cmpSheet.contentTouchElement.removeEventListener(
            "touchstart",
            cmpSheet.touchStart
        );
        cmpSheet.contentTouchElement.removeEventListener(
            "touchmove",
            cmpSheet.touchMoveHandler
        );
        cmpSheet.contentTouchElement.removeEventListener(
            "touchend",
            cmpSheet.touchEnd
        );
        // console.log("closeSheet ended");
    },
    closeSheetOnBlur: function (event) {
        // console.log("closeSheetOnBlur called");
        if (
            event.target === event.currentTarget &&
            cmpSheet.sheetOpen === true
        ) {
            // console.log("closeSheetOnBlur called and qualified to close sheet");
            cmpSheet.slideDownToBottom();
        } /*else {
            console.log("closeSheetOnBlur called but not qualified to close");
        }*/
    },
    closeButtonHandler() {
        // console.log("closeButtonHandler called");
        cmpSheet.overlayElement.removeEventListener(
            "click",
            cmpSheet.closeSheetOnBlur,
            false
        );

        cmpSheet.contentTouchElement.removeEventListener(
            "touchend",
            cmpSheet.touchEnd
        );
        cmpSheet.slideDownToBottom();
    },
    slideUpToHalfScreen: function () {
        // console.log("slideUpToHalfScreen called");
        cmpSheet.contentElement.style.transform = "translateY(50%)";
        cmpSheet.contentElement.classList.add("cmp-sheet__content--half-screen");
    },
    slideDownToHalfScreen: function () {
        // console.log("slideDownToHalfScreen called");
        cmpSheet.contentElement.style.transform = "translateY(50%)";
        cmpSheet.contentElement.classList.add("cmp-sheet__content--half-screen");
        // if it has fullscreen remove it
        if (
            cmpSheet.contentElement.classList.contains(
                "cmp-sheet__content--fullscreen"
            )
        ) {
            cmpSheet.contentElement.classList.remove(
                "cmp-sheet__content--fullscreen"
            );
        }
    },
    slideDownToBottom: function () {
        // console.log("slideDownToBottom called");
        // console.log("moving down to bottom and closing");
        cmpSheet.contentElement.style.transform = "translateY(100%)";
        setTimeout(cmpSheet.closeSheet, 4);
    },
    slideUpToFullScreen: function () {
        // console.log("slideUpToFullscreen called");
        // console.log("moving up to fullscreen");
        cmpSheet.contentElement.style.transform = "translateY(0%)";
        cmpSheet.contentElement.classList.add("cmp-sheet__content--fullscreen");
        // if it has half-screen remove it
        if (
            cmpSheet.contentElement.classList.contains(
                "cmp-sheet__content--half-screen"
            )
        ) {
            cmpSheet.contentElement.classList.remove(
                "cmp-sheet__content--half-screen"
            );
        }
    },
    touchStart: function (event) {
        // console.log("touchStarted called");
        // console.log("start: " + event.touches[0].clientY);
        cmpSheet.prevScrollPos = event.touches[0].clientY;
    },
    touchMoveHandler: function (event) {
        // console.log("touchMoveHandler called");
        let touchstart = cmpSheet.prevScrollPos;
        let touchmove = event.changedTouches[0].clientY;
        let touchDiff = Math.abs(touchstart - touchmove);

        if (touchstart > touchmove) {
            // up
            cmpSheet.slideUpToFullScreen();
        } else {
            // down
            if (
                cmpSheet.contentElement.classList.contains(
                    "cmp-sheet__content--fullscreen"
                ) &&
                touchDiff < 400
            ) {
                // console.log("moving to half screen");
                cmpSheet.slideDownToHalfScreen();
            } else {
                // console.log("moving to bottom");
                cmpSheet.slideDownToBottom();
            }
        }
    },
    touchEnd: function (event) {
        // console.log("touchEnd called");
        event.preventDefault();
    },
    overlayOpen: function () {
        cmpSheet.overlayElement.classList.add("overlay-open");
    },
    overlayClose: function () {
        cmpSheet.overlayElement.classList.remove("overlay-open");
    }
};

cmpSheet.init();