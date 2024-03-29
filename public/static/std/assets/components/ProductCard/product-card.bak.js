class ProductCard extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    this.shadow = this.attachShadow({ mode: "open" });

    // Define a template for the component
    this.template = document.createElement("template");
    this.template.innerHTML = `
      <style>
        /* Insert your component styles here */
      </style>
      <div class="ProductCard">
        <h2 class="ProductCard__ProductName">${this.productName}</h2>
        ${this.productDescription ? `<p>${this.productDescription}</p>` : ""}
        <!-- Add more conditional rendering here based on props -->
      </div>
    `;

    // Clone the template content and append it to the shadow root
    this.shadow.appendChild(this.template.content.cloneNode(true));
  }

  connectedCallback() {
    // Add your component logic here, such as event listeners or data binding
  }

  // Define getters and setters for props as attributes
  get productName() {
    return this.getAttribute("product-name") || "";
  }

  set productName(value) {
    this.setAttribute("product-name", value);
  }

  get productDescription() {
    return this.getAttribute("product-description") || "";
  }

  set productDescription(value) {
    this.setAttribute("product-description", value);
  }

  // Add getters and setters for other props as needed
}

// Define the custom element
customElements.define("product-card", ProductCard);
