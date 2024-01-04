// Set the date we're counting down to
// noinspection DuplicatedCode

const countDownDate = new Date("Oct 16, 2023 00:00:00").getTime();
/*const countDownDate = new Date("Sep 29, 2023 13:39:30").getTime();*/

let count = 0; // Initialize a counter

// Update the countdown every 1 second
let x = setInterval(function () {
    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the countdown date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="discount-timer"
    // only if distance positive
    if (distance > 0) {
        document.getElementById("discount-timer").innerHTML =
            "<span class='dash'> - </span>" + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    }

    count++; // Increment the counter
    if (count === 1) {
        // Run your function after the first DOM update
        // check the height
        checkMsgBarHeight(0);
    }

    // If the countdown is finished, hide it
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("discount-timer").style.display = "none";
        // check the height
        checkMsgBarHeight(0);
    }
}, 1000);

// if msg-bar height > 50 then it is multiple lines
// adjust configurator image position. a bit lower.
// re-check after timer has disappeared.
function checkMsgBarHeight (scrollPos) {
    const msgBar = document.querySelector("#msg-covid");
    const msgBarHeight = msgBar.clientHeight;
    // console.log('bar height: ' + msgBarHeight);
    const screenWidth = window.screen.width;
    const confView = document.querySelector(".configurator__view");
    if (msgBarHeight >= 50 && screenWidth < 768 && scrollPos === 0) {
        if (confView) {
            confView.style.top = "80px";
        }
    } else {
        // console.log('not 50px high');
        if (confView) {
            // console.log('has conf-view');
            // if scroll position > 50
            if (scrollPos >= 50 && screenWidth < 768) {
                // console.log('scrolled more than 50');
                confView.style.top = "10px";
            } else {
                if (confView.style.top) {
                    // console.log('has top prop');
                    confView.style.removeProperty('top');
                }
                if (confView.style.length === 0) {
                    // console.log('no more style props: ' + confView.style.length);
                    confView.removeAttribute('style');
                }
            }
        }
    }
}