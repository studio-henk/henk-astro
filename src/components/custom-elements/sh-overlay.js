const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
        display: inline-block;
        /*background-color: pink;
        width: 100%;
        height: 100px;*/
    }

    :host([open]) {
        background-color: purple;
    }
    
    .sh-overlay {
    opacity: 0;
    z-index: -1;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    pointer-events: none;
    color: var(--color-white);
    --color-text-button-icon: currentcolor;
  }

  :host([open]) .sh-overlay {
    opacity: 1;
    pointer-events: all;
    z-index: 99999;
  }

  .sh-overlay__inner {
    background-color: rgba(0, 0, 0, 0.94);
    height: 100%;
    opacity: 0;
    transition-delay: 0.1s;
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  :host([open]) .sh-overlay__inner {
    opacity: 1;
  }
  
  sh-overlay[open] {
    background-color: red;
    opacity: 1;
  }
  
  .search-modal__close-button {
    position: absolute;
    top: 28px;
    right: 28px;
  }
  </style>
  <div class="sh-overlay" id="search-modal">
    <div class="sh-overlay__inner">
    <button
      type="button"
      class="search-modal__close-button"
    >
      <span class="icon-frame">
        <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="sh-atom-icon">
            <path d="M1.44766 0.810913L15.0795 14.4427" stroke="currentcolor" stroke-linecap="round"/>
            <path d="M15.0797 0.810913L1.44785 14.4428" stroke="currentcolor" stroke-linecap="round"/>
        </svg>
      </span>
    </button>
        <span id="name"></span>
        <slot />
    </div>
  </div>  
`;

class ShOverlay extends HTMLElement {
  // A getter/setter for an open property.
  get open() {
    return this.hasAttribute("open");
  }
    /*get open() {
        return this.getAttribute("open");
    }*/

  set open(val) {
    // Reflect the value of the open property as an HTML attribute.
    if (val) {
      this.setAttribute("open", val);
    } else {
      this.removeAttribute("open");
    }
    // this.toggleDrawer();
    this.showOverlay();
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    // this.shadowRoot.querySelector("#name").innerText = "World";
    /*this.overlaytrigger = this.getAttribute("overlaytrigger");*/
    //  console.log(this.getAttribute("overlaytrigger"));
  }

  showOverlay() {
    console.log("showing overlay");
        // this._open = true;
      // this.open = true;
      // this.setAttribute("open", "");
  }

  hideOverlay() {
    console.log("hiding overlay");
    // this.open = false;
  }

  static get observedAttributes() {
    return ["name", "open"];
  }

  /*attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return;
        this[property] = newValue;
    }*/
  attributeChangedCallback(name, oldValue, newValue) {
    // do stuff when attributes change
    if (this.open) {
      console.log("opened");
    } else {
      console.log("closed");
    }
    // this.open = newValue;
      console.log("old: " + oldValue + ", new: " + newValue);
  }

  connectedCallback() {
    // this.shadowRoot.querySelector("#name").innerText = this.name;
    // set listener on element to open this overlay
    // target element is its ID which is a attribute on the component
      this.overlaytrigger = this.getAttribute("overlaytrigger");
      const openButton = document.getElementById(this.overlaytrigger);
      console.log(openButton);
      openButton.addEventListener("click", this.showOverlay, false);

    // set listener on close button
    const closeButton = this.shadowRoot.querySelector(
      ".search-modal__close-button"
    );
    //console.log(closeButton);
    closeButton.addEventListener("click", this.hideOverlay, false);
  }

    disconnectedCallback() {
      console.log("disconnectedCallback called");
        /*this.removeEventListener('click', this._onClick);*/
        this.removeEventListener('click', this.hideOverlay, false);
    }
}

customElements.define("sh-overlay", ShOverlay);