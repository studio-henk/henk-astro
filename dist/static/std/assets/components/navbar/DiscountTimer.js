// DiscountTimer.js
export default {
    props: {
        countDownDate: {
            type: String,
            required: true,
        },
        showTimer: {
            type: Boolean,
            required: true,
            default: true,
        },
    },
    data() {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            shouldShowTimer: this.showTimer,
        };
    },
    mounted() {
        this.startCountdown();
    },
    methods: {
        startCountdown() {
            const countDownDate = new Date(this.countDownDate).getTime();
            const x = setInterval(() => {
                const now = new Date().getTime();
                const distance = countDownDate - now;

                this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
                this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

                if (distance < 0) {
                    clearInterval(x);
                    this.shouldShowTimer = false;
                    // this.$emit('countdown-complete');
                }
            }, 1000);
        },
        handleCountdownComplete() {
            // This method will be called when the countdown completes
            console.log('Countdown has completed!');
            // You can perform any actions here, such as hiding the timer
            this.shouldShowTimer = false; // Update the local state
            // this.$emit('update:showTimer', false); // Optionally, emit an event to update the prop in the parent
        },
    },
    template: `
    <div v-if="shouldShowTimer" id="discount-timer">
      <span class="dash"> : </span>
      {{ days }}d {{ hours }}h {{ minutes }}m {{ seconds }}s
    </div>
  `,
};