const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
        display: inline-block;
    }
    
    .category-grid-container {
    position: relative;
  }

  .tertiary-navigation {
  }

  .tertiary-navigation summary {
  }

  .tertiary-navigation__ul {
    list-style: none;
    margin: 0 0 0 1rem;
    padding: 0;
  }

  .tertiary-navigation__gallery {
    display: none;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    justify-content: flex-start;
    position: absolute;
    top: 0;
    background-color: var(--color-accent1);
    left: 0;
    width: 100%;
    z-index: 99;
    height: 100%;
  }

  .tertiary-navigation__gallery.tertiary-navigation__gallery--active {
    display: grid;
  }
        
  </style>
  <div class="LangSwitch">
    <span class="LangSwitch__label">NL</span>
    <span class="LangSwitch__track">
        <span class="LangSwitch__knob"></span>
    </span>
    <span class="LangSwitch__label">EN</span>   
  </div>    
`;

class LangSwitch extends HTMLElement {
  static get observedAttributes() {
    return ["lang", "data-url"];
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
    console.log("disconnectedCallback called");
    this.removeEventListener("click", this.handleClickEvent);
  }

  set lang(value) {
    this.setAttribute("lang", value);
  }

  get lang() {
    return this.getAttribute("lang");
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    console.log("attributeChangedCallback called");
    // do stuff when attributes change
    if (newValue !== oldValue) {
      this.attrName = newValue;
    }
  }

  handleClickEvent(e) {
    e.preventDefault();
    if (this.lang === "nl") {
      this.lang = "en";
    } else {
      this.lang = "nl";
    }
  }
}

customElements.define("lang-switch", LangSwitch);
