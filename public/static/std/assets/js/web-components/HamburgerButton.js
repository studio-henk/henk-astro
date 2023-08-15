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

    /*.HamburgerButton:not(.open) {
        top: 4px;
    }*/
    :host .HamburgerButton {
        top: 4px;
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
        top: 0;
    }

    .HamburgerButton span:nth-child(2),.HamburgerButton span:nth-child(3) {
        top: 8px;
    }

    .HamburgerButton span:nth-child(4) {
        top: 16px;
    }

    /*.HamburgerButton.open span:nth-child(1) {
        top: 18px;
        width: 0;
        left: 50%;
    }*/
    /*:host(.open) {
        background-color: deepskyblue;
    }*/
    
    :host(.open) .HamburgerButton {
        top: 0;
    }
    
    :host(.open) .HamburgerButton span:nth-child(1) {
        top: 18px;
        width: 0;
        left: 50%;
    }

    :host(.open) .HamburgerButton span:nth-child(2) {
        transform: rotate(45deg);
    }

    :host(.open) .HamburgerButton span:nth-child(3) {
        transform: rotate(-45deg);
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
  /*static get observedAttributes() {
    return ['checked', 'data-url'];
  }*/

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

  // A getter/setter for an open property.
  /*set checked(isCheckedVal) {
    const isChecked = Boolean(isCheckedVal);
    const thisCheckboxElement = this.shadowRoot.querySelector("input[type=checkbox]");
    if (isChecked) {
      this.setAttribute('checked', '');
      thisCheckboxElement.checked = true;
      thisCheckboxElement.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
      thisCheckboxElement.checked = false;
      thisCheckboxElement.removeAttribute('checked');
    }
  }*/

  /*get checked() {
    return this.hasAttribute('checked');
  }*/

  /*set otherURL(value) {
    if (value)
      this.setAttribute('data-url', value);
    else
      this.removeAttribute('data-url');
  }*/

  /*get otherURL() {
    return this.getAttribute('data-url');
  }*/

  attributeChangedCallback(attrName, oldValue, newValue) {
    console.log("attributeChangedCallback called");
    // do stuff when attributes change
    if (newValue !== oldValue) {
      this.attrName = newValue;
      // console.log("prop in attrChangecallback: " + attrName + ", old: " + oldValue + ", new: " + newValue);
    }
  }

  handleClickEvent() {
    // this.checked = !this.checked;
    // this.redirectPage();
    this.classList.toggle('open');
  }
}

customElements.define("hamburger-button", HamburgerButton);