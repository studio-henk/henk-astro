/* todo:
- overflow on body when modal is open, remove when closed
- able to use all button types
- slot content
- animate fade in / out
*/

class BaseModal extends HTMLElement {
  static get observedAttributes() {
    return ["open", "openButtonText", "modalTitle"];
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    // this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  generateTemplate() {
    const openButtonText = this.getAttribute("openButtonText") || "Open";
    const modalTitle = this.getAttribute("modalTitle") || "Modal title";

    const template = `
      <link rel="stylesheet" href="/public/static/std/assets/css/components/atom-button-new.css" />
      <link rel="stylesheet" href="/public/static/std/assets/css/components/atom-button-icon.css" />
      <style>
      :host {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
      }
      
      :host * {
        box-sizing: border-box;
      }
  
      :host([open]) {
      }
  
      .BaseModal {
      }
  
      .BaseModal__overlay {
        display: flex;
        opacity: 0;
        background-color: rgba(0,0,0, 0.5);
        position: fixed;
        pointer-events: none;
        top:0;
        left:0;
        bottom:0;
        right:0;
        z-index: -1;      
        justify-content: center;
        align-items:center;
        transition: opacity 1.3s ease; 
      }
  
      :host([open]) .BaseModal__overlay {
        opacity: 1; 
        z-index: 9999999;
        pointer-events: all;
      }
  
      .BaseModal__content {
        background-color: var(--color-white,#fff);
        border-radius: 8px;
        margin: 0 auto;
        width: 100vw;
        max-height: 90vh;
        max-width: 90vw;
        display: flex;
        flex-direction: column;
        /*justify-content: space-between;*/
        padding: 16px;
        gap: 1rem;
      }
      
      @media only screen and (min-width: 768px) {
        .BaseModal__content {
            width: 50vw;
            min-width: 25vw;
            max-width: 640px;
        }
      }           
      
      .BaseModal__header {
        display: flex;
        justify-content: center;
        position:relative;
      }
      
      .BaseModal__header-title {
        font-size: 1.375rem;      
      }
           
      .modal_close {
          position: absolute;
          right: 0;
          padding: 0;
      }
      </style>
      <div class="BaseModal">
        <button type="button" class="sh-atom-button modal_open" part="open-button" data-style="plain-dark" data-text-underline="true">${openButtonText}</button>
        <div class="BaseModal__overlay">               
          <div class="BaseModal__content">
            <div class="BaseModal__header">
                <span class="BaseModal__header-title">${modalTitle}</span>
                <button type="button" class="sh-atom-button-icon modal_close" data-style="plain-dark">
                    <span class="icon-frame">
                      <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><!--<title>{icon}</title>-->
                        <path d="M1.44766 0.810913L15.0795 14.4427" stroke="currentcolor" stroke-linecap="round"></path> <path d="M15.0797 0.810913L1.44785 14.4428" stroke="currentcolor" stroke-linecap="round"></path></svg>
                    </span>
                </button>
            </div>
            <div class="BaseModal__main">            
                <slot name="content" />
            </div>
            <div class="BaseModal__footer">
                <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
    `;

    return template;
  }

  connectedCallback() {
    // Generate and append the template to the shadow DOM
    this.shadowRoot.innerHTML = this.generateTemplate();
    // TODO: try without shadow dom

    // remove hidden attr
    this.removeAttribute("hidden");

    // event handler on button
    const thisOpenButtonElement = this.shadowRoot.querySelector(".modal_open");
    const thisCloseButtonElement =
      this.shadowRoot.querySelector(".modal_close");
    const thisModalOverlay = this.shadowRoot.querySelector(
      ".BaseModal__overlay"
    );

    thisOpenButtonElement.addEventListener("click", this.openModal.bind(this));
    thisCloseButtonElement.addEventListener(
      "click",
      this.closeModal.bind(this)
    );
    thisModalOverlay.addEventListener("click", this.closeModal.bind(this));

    // Event handler for the modal content
    const modalContentElement = this.shadowRoot.querySelector(
      ".BaseModal__content"
    );
    modalContentElement.addEventListener("click", (event) => {
      // Prevent the click event from propagating to the overlay
      event.stopPropagation();
    });
  }

  disconnectedCallback() {
    console.log("disconnectedCallback called");
  }

  // A getter/setter for an open property.
  get open() {
    return this.hasAttribute("open");
  }

  set open(val) {
    // Reflect the value of the open property as an HTML attribute.
    if (val) {
      this.setAttribute("open", "");
    } else {
      this.removeAttribute("open");
    }
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    console.log("attributeChangedCallback called");
    // do stuff when attributes change
    if (newValue !== oldValue) {
      this.attrName = newValue;
      // console.log("prop in attrChangecallback: " + attrName + ", old: " + oldValue + ", new: " + newValue);
    }
    /*if (attrName === 'open' && newValue !== oldValue) {
      console.log('yess');
      if (newValue !== 'true') {
        closeModal();
      }
    }*/
  }

  openModal() {
    // console.log("clicked, opening");
    // add class
    document.querySelector("body").classList.add("BaseModal_open");
    this.open = true;
  }

  // Close the modal when the overlay is clicked
  closeModal() {
    // console.log("clicked, closing");
    document.querySelector("body").classList.remove("BaseModal_open");
    this.open = false;
  }
}

customElements.define("base-modal", BaseModal);