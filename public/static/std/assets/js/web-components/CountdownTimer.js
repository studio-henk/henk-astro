// noinspection JSUnusedGlobalSymbols

const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      display: inline-block;      
    }
    
    @media only screen and (min-width: 768px) {
        :host {
            padding-left: 0.5rem !important;
        }
    }

    .CountdownTimer {
      font-size: 1em;
      font-weight: bold;
    }

    :host(.timer-hidden) .CountdownTimer {
        display: none;
    }
  </style>
  <div class="CountdownTimer" part="timer-hidden">
    <span class="CountdownTimer__days"></span>
    <span class="CountdownTimer__hours"></span>
    <span class="CountdownTimer__minutes"></span>
    <span class="CountdownTimer__seconds"></span>
  </div>
`;

class CountdownTimer extends HTMLElement {
    static get observedAttributes() {
        return ["start-date-time", "end-date-time", "lang"];
    }

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        // console.log("ConnectedCallback called");

        // Set default value for lang if not provided
        if (!this.lang) {
            this.lang = "en"; // Set default language to "en"
        }

        // Check if 'start-date-time' was set
        if (!this.hasAttribute("start-date-time")) {
            // console.log(`Required Attribute 'start-date-time' was not set`);
            console.log(
                '%cRequired Attribute "start-date-time" was not set. Defaulting to Now.',
                "color: red; font-weight: bold;",
            );

            // Set the attribute with the current date and time
            const now = new Date().toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: false,
            });

            this.setAttribute("start-date-time", now);
        }

        // Check if 'end-date-time' was set
        if (!this.hasAttribute("end-date-time")) {
            console.log(
                '%cRequired Attribute "end-date-time" was not set. Not showing counter.',
                "color: red; font-weight: bold;",
            );

            // Set the attribute to 1 jan 1970
            this.setAttribute("end-date-time", "Oct 4, 1972 11:05:00");
        }

        this.checkDateTimes();

        // Set up an interval to update the timer every second
        this.timerInterval = setInterval(() => {
            this.checkDateTimes();
        }, 1000);

        // Check if the timer has already finished on page load
        if (this.timerFinished) {
            // console.log("Timer has already finished on page load");
            this.hideTimer();
        }
    }

    disconnectedCallback() {
        console.log("DisconnectedCallback called");

        // Clear the interval when the element is disconnected
        clearInterval(this.timerInterval);
    }

    set startDateTime(value) {
        this.setAttribute("start-date-time", value);
    }

    get startDateTime() {
        return this.getAttribute("start-date-time");
    }

    set endDateTime(value) {
        this.setAttribute("end-date-time", value);
    }

    get endDateTime() {
        return this.getAttribute("end-date-time");
    }

    set lang(value) {
        this.setAttribute("lang", value);
    }

    get lang() {
        return this.getAttribute("lang");
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        /*console.log(
            `Attribute ${attrName} changed from ${oldValue} to ${newValue}`,
        );*/
        if (newValue !== oldValue) {
            this[attrName] = newValue;
        }
    }

    checkDateTimes() {
        // console.log("Verifying dates");
        // Check if the timer has already finished
        if (this.timerFinished) {
            // console.log("Timer has already finished");
            clearInterval(this.timerInterval);
            return;
        }

        const startDate = new Date(this.startDateTime).getTime();
        const endDate = new Date(this.endDateTime).getTime();
        const now = new Date().getTime();

        // Check if start date-time is in the past or is the current time
        let startValid = false;
        if (!(isNaN(startDate) || startDate > now)) {
            // console.log("start time is in the past: ✅");
            startValid = true;
        } else {
            // console.log(`✋: Countdown will start at ${new Date(startDate)}`);
            startValid = false;
        }

        // check end date time
        let endValid = false;
        if (!(isNaN(endDate) || endDate < now)) {
            // console.log("end time is in the future: ✅");
            endValid = true;
        } else {
            // console.log("end time is in past?: 🚫");
            endValid = false;
            this.timerFinished = true;
        }

        // compare
        if (startValid && endValid) {
            /*console.log("dates valid. ready to show timer");*/
            console.log("dates valid.");
            this.timerFinished = false; // Reset the flag when dates are valid
            this.updateTimer();
            if (this.timerHidden) {
                this.unhideTimer();
            }
        } else {
            console.log("dates invalid. not showing timer");
            this.hideTimer();
            this.timerFinished = true;
        }
    }

    hideTimer() {
        this.classList.add("timer-hidden");
        this.timerHidden = true;
    }

    unhideTimer() {
        this.classList.remove("timer-hidden");
    }

    updateTimer() {
        const daysSpan = this.shadowRoot.querySelector(".CountdownTimer__days");
        const hoursSpan = this.shadowRoot.querySelector(".CountdownTimer__hours");
        const minutesSpan = this.shadowRoot.querySelector(
            ".CountdownTimer__minutes",
        );
        const secondsSpan = this.shadowRoot.querySelector(
            ".CountdownTimer__seconds",
        );

        const startDate = new Date(this.startDateTime).getTime();
        const endDate = new Date(this.endDateTime).getTime();
        const now = new Date().getTime();

        if (isNaN(startDate) || isNaN(endDate) || startDate >= endDate) {
            console.error("Invalid startDateTime or endDateTime values.");
            return;
        }

        const distance = endDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Show only non-zero units
        daysSpan.textContent = days > 0 ? days + "d" : "";
        hoursSpan.textContent =
            days > 0 || hours > 0
                ? this.lang === "nl"
                    ? hours + "u"
                    : hours + "h"
                : "";
        minutesSpan.textContent = hours > 0 || minutes > 0 ? minutes + "m" : "";
        secondsSpan.textContent = seconds > 0 ? seconds + "s" : "";

        // Check if the timer has reached the end date
        if (distance <= 0) {
            this.timerFinished = true;
        }
    }
}

customElements.define("countdown-timer", CountdownTimer);