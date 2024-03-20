const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
        display: inline-block;
    }
    
    .HamburgerButton {
        width: 18px;
        height: 18px;
        position: relative;
        margin: 0;
        transform: rotate(0deg);
        transition: .5s ease-in-out;
        cursor: pointer;
    }

    .HamburgerButton span {
        pointer-events: none;
        display: block;
        position: absolute;
        height: 1px;
        width: 100%;
        background-color: var(--color-background-button-nav-mobile, #000);
        border-radius: 4px;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        transition: .25s ease-in-out;
    }

    .HamburgerButton span:nth-child(1) {
        top: 4px;
    }

    .HamburgerButton span:nth-child(2),.HamburgerButton span:nth-child(3) {
        top: 12px;
    }

    .HamburgerButton span:nth-child(4) {
        top: 16px;
    }
    
    :host(.open) .HamburgerButton span:nth-child(1) {
        top: 18px;
        width: 0;
        left: 50%;
    }

    :host(.open) .HamburgerButton span:nth-child(2) {
        transform: rotate(45deg);
        top: 8px;
    }

    :host(.open) .HamburgerButton span:nth-child(3) {
        transform: rotate(-45deg);
        top: 8px;
    }

    :host(.open) .HamburgerButton span:nth-child(4) {
        top: 18px;
        width: 0;
        left: 50%;
    }

  </style>
  <div class="HamburgerButton">
    <span></span>
    <span></span>
    <span></span>
</div>
`;

class HamburgerButton extends HTMLElement {

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

  attributeChangedCallback(attrName, oldValue, newValue) {
    // console.log("attributeChangedCallback called");
    // do stuff when attributes change
    if (newValue !== oldValue) {
      this.attrName = newValue;
    }
  }

  handleClickEvent() {
    this.classList.toggle('open');
  }
}

customElements.define("hamburger-button", HamburgerButton);