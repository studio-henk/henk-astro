const template = document.createElement("template");
template.innerHTML = `
  <style>
     .hello-world h1 {
      font-weight: bold;
      font-family: sans-serif;
      color: red;
    }
  </style>
  <div class="hello-world">
  <h1>Hello <span id="name"></span>!</h1> 
  </div>
`;

class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector("#name").innerText = "World";
  }

  static get observedAttributes() {
    return ["name"];
  }

  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[property] = newValue;
  }

  connectedCallback() {
    this.shadowRoot.querySelector("#name").innerText = this.name;
  }
}

customElements.define("hello-world", HelloWorld);
