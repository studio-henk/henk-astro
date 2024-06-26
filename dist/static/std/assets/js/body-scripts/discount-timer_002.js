// Set the date we're counting down to
// noinspection DuplicatedCode

const countDownDate = new Date("Oct 15, 2023 23:59:59").getTime();
/*const countDownDate = new Date("Oct 10, 2023 11:50:45").getTime();*/

let count = 0; // Initialize a counter

// Update the countdown every 1 second
let x = setInterval(function () {
    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the countdown date
    let distance = countDownDate - now;

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
    /*if (count === 1) {
        // Run your function after the first DOM update
    }*/

    // If the countdown is finished, hide it
    // remove class .sh-org-msg-bar--discount from bar to revert to original style
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("discount-timer").style.display = "none";
        document.getElementById("msg-covid").classList.remove("sh-org-msg-bar--discount");
    }
}, 1000);