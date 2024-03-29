class ProductCard extends HTMLElement {
  constructor() {
    super();
    // Initialize productImages with an empty array if it's not already set
    if (!this.productImages) {
      this.productImages = [];
    }
    if (!this.productPrices) {
      this.productPrices = [];
    }
    if (!this.productLinks) {
      this.productLinks = [];
    }
    if (!this.fabricImages) {
      this.fabricImages = [];
    }
    if (!this.fabricNames) {
      this.fabricNames = [];
    }

    if (!this.fabricLabel) {
      this.fabricLabel = "Upholstery";
    }

    if (!this.productSwatchSize) {
      this.productSwatchSize = "small";
    }

    // Create a shadow root
    this.shadow = this.attachShadow({ mode: "open" });

    // Define a template for the component
    this.template = document.createElement("template");
    this.template.innerHTML = `
      <style>
        .ProductCard {
    background-color: var(--color-background-primary);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .ProductCard img {
    max-width: 100%;
  }

  .ProductCard__link {
    text-decoration: none;
  }

  .ProductCard__link:focus,
  .ProductCard__link:hover {
    color: currentColor;
  }

  .ProductCard__image-container {
    flex: 1;
    overflow: hidden;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .ProductCard__img {    
    width: auto;
    height: 100%;
    object-fit: cover;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    transition: transform 0.3s ease;
    transform: scale(1.5);
  }

  .ProductCard__link:hover .ProductCard__img {
    transform: scale(1.75);
  }

  .ProductCard__content * {
    margin: 0;
  }

  .ProductCard__content {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .ProductCard__content > ul {
    margin-left: 24px;
  }

  .ProductCard__ProductName {
    font-size: 20px;
  }

  .ProductCard__Price {
    text-align: right;
    font-size: 20px;
  }

  .ProductCard__config {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .ProductCard__config-options {
    display: flex;
    flex-wrap: wrap;
    // flex-direction: column;
    gap: 1rem;
  }

  .ProductCard__swatch {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    border-radius: 50px;        
    font-size: 0;
  }

  .ProductCard__swatch img {
    border-radius: 50px;
  }

  .ProductCard__swatch {
    border: 2px solid transparent;
  }

  .ProductCard__swatch--selected {
    border: 2px solid black;
  }

  .ProductCard__swatch:hover {
    border: 2px solid black;
  }

  .ProductCard__swatch-container {
    position: relative;
    // height: 48px;
  }

  .ProductCard__swatch-container--small {
    display: flex;
    gap: 4px;
    flex-wrap: nowrap;
    min-width: 136px;
  }

  .ProductCard__swatch-container--large {
    display: flex;
    gap:8px;
  }

  // :host {
  //   background-color: yellow;
  //   color:red;
  // }

  // :host p {
  //   background-color: magenta;
  //   color:yellow;
  // }

  :host([product-swatch-size="large"]) {
    // background-color: green;
    // color:yellow;
  }

  // :host([product-swatch-size="large"]) p {
  //   background-color: pink;
  //   color:black;
  // }

  :host([product-swatch-size="large"]) .ProductCard__config-options {
    flex-direction: column;
  }

  :host([product-swatch-size="large"]) .ProductCard__config-options .ProductCard__label {
    width: 100%;
  }

  :host([product-swatch-size="large"]) .ProductCard__config-options .ProductCard__swatch-container {
    display: flex;
    gap: 8px;
  }

  .items-stacked .ProductCard__swatch {
    position: absolute;
    --spacing-swatch: 24;
  }

  .items-stacked .ProductCard__swatch:not(:first-child) {
    margin-left: calc(var(--spacing-swatch) * 1px);
  }

  .items-stacked .ProductCard__swatch.color-orange {
    margin-left: calc(2 * var(--spacing-swatch) * 1px);
  }

  .items-stacked .ProductCard__swatch.color-brown {
    margin-left: calc(3 * var(--spacing-swatch) * 1px);
  }

  .items-stacked .ProductCard__swatch.color-blue {
    /* margin-left: calc(4 * 24px); */
    margin-left: calc(4 * var(--spacing-swatch) * 1px);
  }

  img.ProductCard__swatch {
    mix-blend-mode: darken;
  }

  .ProductCard__swatch-container--small {
    height: 24px;
    line-height: 12px;
  }

  .ProductCard__swatch-container--small .ProductCard__swatch {
    width: 20px;
    height: 20px;
    --spacing-swatch: 12;
  }

  .ProductCard .button-group {
    padding: 0 !important;
  }

  @media only screen and (min-width: 1024px) {
    .ProductCard__config-options {
      flex-direction: row;
      align-items: center;
    }

    .ProductCard__label {
      /*flex: 2;*/
    }

    .ProductCard__swatch-container {
      // flex: 3;
    }
  }

      </style>
      <div class="ProductCard">
        <div class="ProductCard__image-container">
          <a href="${this.productLinks[0]}" class="ProductCard__link">
            <img
              src="/images/products/chairs/${this.productImages[0]}"
              width="1240"
              height="1240"
              class="ProductCard__img"
            />
          </a>
        </div>
        <div class="ProductCard__content">
          <p class="ProductCard__ProductName">${this.productName}</p>
          ${this.productDescription ? `<p>${this.productDescription}</p>` : ""}
          <div class="ProductCard__config-options">
            <p class="ProductCard__label">${this.fabricLabel}</p>            
            <div class="ProductCard__swatch-container${
              this.productSwatchSize === "small"
                ? " ProductCard__swatch-container--small"
                : ""
            }">
              ${this.renderSwatches()}
            </div>
            <span class="ProductCard__label">+540</span>
          </div>
          <div class="button-group" data-alignment="end" part="button-group align-end">
            <a 
              href="${this.productLinks[0]}" 
              class="sh-atom-button ProductCard__Price" 
              data-style="filled" 
              part="button filled"
            >${this.productPrices[0]}
              <!--<span class="sh-atom-button__price xProductCard__Price" part="price">${
                this.productPrices[0]
              }</span>-->
            </a>
          </div>
        </div>
      </div>
    `;

    // Clone the template content and append it to the shadow root
    this.shadow.appendChild(this.template.content.cloneNode(true));
  }

  connectedCallback() {
    // Add event listeners for swatch hover
    this.shadow.querySelectorAll(".ProductCard__swatch").forEach((swatch) => {
      swatch.addEventListener("mouseover", () => {
        // Remove selected class from all swatches within this card
        this.removeAllSelectedSwatches();

        // Add selected class to the hovered swatch
        swatch.classList.add("ProductCard__swatch--selected");

        this.updateMainImage(swatch.getAttribute("data-image"));
        this.updateMainImageHref(swatch.getAttribute("data-link"));
        this.updateButtonHref(swatch.getAttribute("data-link"));
        this.updatePrice(swatch.getAttribute("data-prices"));
      });
    });
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

  get productImages() {
    const attributeValue = this.getAttribute("product-images");
    return attributeValue ? JSON.parse(attributeValue.replace(/'/g, '"')) : [];
  }

  set productImages(value) {
    // Convert the value to JSON string and replace double quotes with single quotes
    const jsonString = JSON.stringify(value).replace(/"/g, "'");
    this.setAttribute("product-images", jsonString);
  }

  get productLinks() {
    const attributeValue = this.getAttribute("product-links");
    return attributeValue ? JSON.parse(attributeValue.replace(/'/g, '"')) : [];
  }

  set productLinks(value) {
    // Convert the value to JSON string and replace double quotes with single quotes
    const jsonString = JSON.stringify(value).replace(/"/g, "'");
    this.setAttribute("product-links", jsonString);
  }

  get productPrices() {
    // return JSON.parse(this.getAttribute("product-prices")) || [];
    const attributeValue = this.getAttribute("product-prices");
    return attributeValue ? JSON.parse(attributeValue.replace(/'/g, '"')) : [];
  }

  set productPrices(value) {
    this.setAttribute(
      "product-prices",
      JSON.stringify(value).replace(/"/g, "'")
    );
  }

  get productSwatchSize() {
    return this.getAttribute("product-swatch-size") || "";
  }

  set productSwatchSize(value) {
    this.setAttribute("product-swatch-size", value);
  }

  get fabricLabel() {
    return this.getAttribute("fabric-label") || "";
  }

  set fabricLabel(value) {
    this.setAttribute("fabric-label", value);
  }

  get fabricImages() {
    // return JSON.parse(this.getAttribute("fabric-images")) || [];
    const attributeValue = this.getAttribute("fabric-images");
    return attributeValue ? JSON.parse(attributeValue.replace(/'/g, '"')) : [];
  }

  set fabricImages(value) {
    this.setAttribute(
      "fabric-images",
      JSON.stringify(value).replace(/"/g, "'")
    );
  }

  get fabricNames() {
    // return JSON.parse(this.getAttribute("fabric-names")) || [];
    const attributeValue = this.getAttribute("fabric-names");
    return attributeValue ? JSON.parse(attributeValue.replace(/'/g, '"')) : [];
  }

  set fabricNames(value) {
    this.setAttribute("fabric-names", JSON.stringify(value).replace(/"/g, "'"));
  }

  // Add getters and setters for other props as needed

  // Method to render swatches based on productImages and fabricNames
  renderSwatches() {
    let swatchesHTML = this.fabricImages
      .map(
        (image, index) => `
    <a href="${this.productLinks[index]}" class="ProductCard__swatch${
          index === 0 ? " ProductCard__swatch--selected" : ""
        }" 
      title="${this.fabricNames[index]}" 
      data-image="${this.productImages[index]}" 
      data-prices="${this.productPrices[index]}"
      data-link="${this.productLinks[index]}"
    >
      <img src="/images/products/chairs/${image}" alt="stof" />
    </a>
  `
      )
      .join("");

    return swatchesHTML;
  }

  // Method to update main image
  updateMainImage(imagePath) {
    const mainImage = this.shadow.querySelector(".ProductCard__img");
    if (mainImage) {
      mainImage.src = `/images/products/chairs/${imagePath}`;
    }
  }

  // Method to update main image href
  updateMainImageHref(imageLink) {
    const mainImageLink = this.shadow.querySelector(".ProductCard__link");
    if (mainImageLink) {
      mainImageLink.href = `${imageLink}`;
    }
  }

  // Method to update button href
  updateButtonHref(imageLink) {
    const button = this.shadow.querySelector(".sh-atom-button");
    if (button) {
      button.href = `${imageLink}`;
    }
  }

  // Method to update price element
  updatePrice(price) {
    const priceElement = this.shadow.querySelector(".ProductCard__Price");
    if (priceElement) {
      priceElement.textContent = price;
    }
  }

  removeAllSelectedSwatches() {
    this.shadow
      .querySelectorAll(".ProductCard__swatch--selected")
      .forEach((selectedSwatch) => {
        selectedSwatch.classList.remove("ProductCard__swatch--selected");
      });
  }
}

// Define the custom element
customElements.define("product-card", ProductCard);
