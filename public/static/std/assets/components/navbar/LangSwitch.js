/* TODO: browser history support?
*   checkbox status is cached and shows wrong option checked after user clicked 'back' button
* */
const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
        display: inline-block;
    }
    
    .LangSwitch {
        display: flex;
        gap: 4px;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .LangSwitch__track {
        width: 24px;
        background-color: rgba(0, 0, 0, 0.2);
        height: 12px;
        border-radius: 30px;
    }

    .LangSwitch__knob {
        width: 12px;
        height: 12px;
        display: block;
        background-color: var(--color-accent19, #000);
        border-radius: 50%;
        transition: transform .3s ease;
    }
    
    .LangSwitch__link {
        color: currentColor;
        text-decoration:none;
    }
    
    :host([lang="en"]) .LangSwitch__knob {
        transform: translateX(100%);
    }
    
    :host([lang="nl"]) .LangSwitch__label:first-child,
    :host([lang="en"]) .LangSwitch__label:last-child {
        cursor: not-allowed;
    }   
   
    
        
  </style>
  <div class="LangSwitch">
    <span class="LangSwitch__label" part="label-nl">NL</span>
    <span class="LangSwitch__track">
        <span class="LangSwitch__knob"></span>
    </span>
    <span class="LangSwitch__label" part="label-en">EN</span>   
  </div>    
`;

class LangSwitch extends HTMLElement {
  static get observedAttributes() {
    return ['lang', 'data-url'];
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.addEventListener("click", this.handleClickEvent);
  }

  disconnectedCallback() {
    // console.log("disconnectedCallback called");
    this.removeEventListener("click", this.handleClickEvent);
  }

  set lang(value) {
      this.setAttribute('lang', value);
  }

  get lang() {
    return this.getAttribute('lang');
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    // console.log("attributeChangedCallback called");
    // do stuff when attributes change
    if (newValue !== oldValue) {
      this.attrName = newValue;
    }
  }

  handleClickEvent(e) {
    e.preventDefault();
    if (this.lang === "nl") {
      this.lang = "en"
    } else {
      this.lang = "nl"
    }
  }
}

customElements.define("lang-switch", LangSwitch);