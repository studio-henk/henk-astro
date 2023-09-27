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
        align-items: center;
        gap: 4px;
        position: relative;
        cursor: pointer;
    }

    .LangSwitch input[type="checkbox"] {
        display: block;
        opacity: 1;
        width: 23px;
        position: absolute;
        left: 28px;
        top: 7px;
        appearance: none;
        height: 13px;
        background: transparent;
        border: 0;
        cursor: pointer;
    }

    .LangSwitch input[type="checkbox"]:focus-visible,
    .LangSwitch input[type="checkbox"]:focus-visible {
        outline-offset: 3px;
        outline: #00bfff solid 1px;
    }

    .LangSwitch .LangSwitch__label {
        background-color: rgba(0, 0, 0, 0.2);
        width: 23px;
        height: 11px;
        border-radius: 30px;
        display: flex;
        flex-direction: column;
    }

    /*[data-theme="dark"] .LangSwitch2 .LangSwitch2__label,
    .--masthead-desktop-hovered .LangSwitch2 .LangSwitch2__label{
        background-color: rgba(0, 0, 0, 0.2);
    }*/

    .LangSwitch .LangSwitch__label .slider {
        height: 11px;
        width: 11px;
        background-color: var(--color-accent19);
        border-radius: 30px;
        margin: 0;
    }

    .LangSwitch input:checked + .LangSwitch__label > .slider {
        align-self: flex-end;
    }
    
    .LangSwitch__pseudo-label {
        
    }
  </style>
  <div class="LangSwitch" id="">
    <span class="LangSwitch__pseudo-label">NL</span>
    <input type="checkbox" id="" class="LangSwitch__checkbox">
    <label for="LangSwitch__language" class="LangSwitch__label">
        <span class="slider"></span>
    </label>
    <span class="LangSwitch__pseudo-label">EN</span>
  </div>    
`;

class LangSwitch extends HTMLElement {
    static get observedAttributes() {
        return ['checked', 'data-url'];
    }

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        /*if (!this.hasAttribute('role'))
            this.setAttribute('role', 'checkbox');
        if (!this.hasAttribute('tabindex'))
            this.setAttribute('tabindex', 0);*/
        // get lang from html element
        const lang = document.documentElement.getAttribute("lang");
        // check lang and if EN, set checked property
        if (lang === "en") {
            this.checked = true;
        }
        this.addEventListener("click", this.handleChangeEvent);
    }

    disconnectedCallback() {
        console.log("disconnectedCallback called");
        this.removeEventListener("click", this.handleChangeEvent);
    }

    // A getter/setter for an open property.
    set checked(isCheckedVal) {
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
    }

    get checked() {
        return this.hasAttribute('checked');
    }

    set otherURL(value) {
        if (value)
            this.setAttribute('data-url', value);
        else
            this.removeAttribute('data-url');
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

    handleChangeEvent() {
        this.checked = !this.checked;
        this.redirectPage();
    }

    redirectPage() {
        // console.log("redirecting to:" + this.otherURL);
        document.location.assign(this.otherURL);
    }
}

customElements.define("lang-switch", LangSwitch);