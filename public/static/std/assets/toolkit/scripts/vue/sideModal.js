export default {
  props: {
    buttonType: {
      type: String,
      default: "button",
      required: true,
    },
    buttonId: {
      type: String,
      default: "button",
      required: true,
    },
    buttonText: {
      type: String,
      // required: true,
      default: "button text",
    },
    modalMaxWidth: {
      type: String,
      default: "200px",
    },
    overlayOpacity: {
      type: String,
      default: "0.3",
    },
    hideOnDevice: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    onShow() {
      /* prevent page from scrolling */
      document.querySelector("body").style.overflow = "hidden";
    },
    onHide() {
      /* prevent page from scrolling */
      document.querySelector("body").style.removeProperty("overflow");
      if (document.querySelector("body").style.length === 0) {
        document.querySelector("body").removeAttribute("style");
      }
    },
  },
  template: `
  <div class="side-modal">
    <button 
        :type="buttonType"
        :id="buttonId"
        @click.prevent="show = true"
        class="sh-atom-button"
        data-style="plain"
        data-text-underline="true"
        data-size="small"
    >{{ buttonText }}    
    </button>
    <transition name="side-modal" @enter="onShow" @leave="onHide">        
        <div v-if="show" class="side-modal side-modal-mask" @click.self="show = false" :style="{ '--color-background-alpha-overlay': '0.1'}">
        <div class="side-modal-container" :style="{ 'max-width': modalMaxWidth + 'px' }">
            <div class="side-modal-header">
            <slot name="header"></slot>
            <button 
                type="button"
                class="sh-atom-button side-modal__close-button"
                data-style="plain-dark"
                @click="show = false"
            >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="sh-atom-icon" aria-hidden="true">
                <g id="icon-close">
                    <g id="icon-close-g">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.20017 2.20018C2.46707 1.93328 2.89979 1.93327 3.16669 2.20017L21.7996 20.8332C22.0664 21.1001 22.0665 21.5328 21.7996 21.7997C21.5327 22.0666 21.0999 22.0666 20.833 21.7997L2.20017 3.1667C1.93328 2.89981 1.93328 2.46708 2.20017 2.20018Z"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.7998 2.20017C22.0667 2.46707 22.0667 2.8998 21.7998 3.1667L3.16695 21.7998C2.90005 22.0667 2.46733 22.0667 2.20043 21.7998C1.93354 21.5329 1.93354 21.1002 2.20043 20.8333L20.8333 2.20018C21.1002 1.93328 21.5329 1.93327 21.7998 2.20017Z"></path>
                    </g>
                </g>
            </svg>
            </button>
            </div>

            <div class="side-modal-body">
            <slot name="body"><p>default body</p></slot>
            </div>

            <div class="side-modal-footer">
            <slot name="footer"></slot>
            </div>
        </div>
        </div>
    </transition>
  </div>
  `,
};
