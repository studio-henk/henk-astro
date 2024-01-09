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
        /*cursor: pointer;*/
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

    /*[data-active="right"] .LangSwitch__knob {
        transform: translateX(100%);
    }*/
    
    :host([lang="en"]) .LangSwitch__knob {
        transform: translateX(100%);
    }
    
    :host([lang="nl"]) .LangSwitch__label:first-child,
    :host([lang="en"]) .LangSwitch__label:last-child{
        cursor: not-allowed;
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
    return ['lang', 'data-url'];
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const LangSwitchInner = this.shadowRoot.querySelector(".LangSwitch");
    // based on current language create a span and link for the languages NL and EN
/*
    if (this.lang === "nl") {
      const NLspan = document.createElement("span");
      NLspan.innerText = "NL";
      NLspan.className = "LangSwitch__label";
      LangSwitchInner.prepend(NLspan);
      const ENlink = document.createElement("a");
      ENlink.innerText = "EN";
      ENlink.className = "LangSwitch__link";
      ENlink.href = "/en/"
      LangSwitchInner.append(ENlink);
    } else {
      const ENspan = document.createElement("span");
      ENspan.innerText = "EN";
      ENspan.className = "LangSwitch__label";
      LangSwitchInner.append(ENspan);
      const NLlink = document.createElement("a");
      NLlink.innerText = "NL";
      NLlink.className = "LangSwitch__link";
      NLlink.href = "/nl/"
      LangSwitchInner.prepend(NLlink);
    }
*/
  }

  connectedCallback() {
    this.addEventListener("click", this.handleClickEvent);
  }

  disconnectedCallback() {
    console.log("disconnectedCallback called");
    this.removeEventListener("click", this.handleClickEvent);
  }

  set lang(value) {
      this.setAttribute('lang', value);
  }

  get lang() {
    return this.getAttribute('lang');
  }

  set otherURL(value) {
    this.setAttribute('data-url', value);
    //this.setAttribute('title', value);
  }

  get otherURL() {
    return this.getAttribute('data-url');
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    console.log("attributeChangedCallback called");
    // do stuff when attributes change
    if (newValue !== oldValue) {
      this.attrName = newValue;
      // console.log("prop in attrChangecallback: " + attrName + ", old: " + oldValue + ", new: " + newValue);
    }
  }

  handleClickEvent(e) {
    e.preventDefault();
    if (this.lang === "nl") {
      this.lang = "en"
    } else {
      this.lang = "nl"
    }
    // this.swapSpansAndLinks();
  }

  swapSpansAndLinks() {
    console.log(this.lang);
    if (this.lang === "nl") {
      const NL_label = document.createElement("span");
      NL_label.innerText = "NL";
      NL_label.className = "LangSwitch__label";
      // swap with existing link
      const Link2Swap = this.shadowRoot.querySelectorAll(".LangSwitch__link");
      console.log(Link2Swap[0])
      Link2Swap[0].replaceWith(NL_label);

      const EN_link = document.createElement("a");
      EN_link.innerText = "EN";
      EN_link.className = "LangSwitch__link";
      EN_link.href = "/en/"
      const Label2Swap = this.shadowRoot.querySelectorAll(".LangSwitch__label");
      console.log(Label2Swap[0])
      Label2Swap[1].replaceWith(EN_link);
    } else {
      const EN_label = document.createElement("span");
      EN_label.innerText = "EN";
      EN_label.className = "LangSwitch__label";
      // swap with existing link
      const Link2Swap = this.shadowRoot.querySelectorAll(".LangSwitch__link");
      Link2Swap[0].replaceWith(EN_label);

      const NL_link = document.createElement("a");
      NL_link.innerText = "NL";
      NL_link.className = "LangSwitch__link";
      NL_link.href = "/nl/"
      const Label2Swap = this.shadowRoot.querySelectorAll(".LangSwitch__label");
      Label2Swap[0].replaceWith(NL_link);
    }
  }
}

customElements.define("lang-switch", LangSwitch);