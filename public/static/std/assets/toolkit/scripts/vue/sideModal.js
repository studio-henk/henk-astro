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
      default: "button text"
    },
    modalMaxWidth: {
      type: String,
      default: "200px"
    },
    overlayOpacity: {
      type: String,
      default: "0.3"
    },
    hideOnDevice: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    onShow() {
      /* prevent page from scrolling */
      document.querySelector('body').style.overflow = 'hidden';
    },
    onHide() {
      /* prevent page from scrolling */
      document.querySelector('body').style.overflow = 'auto';
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
                class="sh-atom-button-icon side-modal__close-button" 
                @click="show = false"
            >
            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.44766 0.810913L15.0795 14.4427" stroke="currentcolor" stroke-linecap="round"></path> <path d="M15.0797 0.810913L1.44785 14.4428" stroke="currentcolor" stroke-linecap="round"></path>
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
  `
};