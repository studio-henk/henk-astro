class CardWithImage extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        // Define the HTML template as a string
        const templateString = `
        <a href="" class="nav-card__link hover-interaction-c-2" title="">
          <div class="nav-card__image-mask">
            <img src="" class="nav-card__image" alt="" width="" height="" decoding="async" loading="eager" />
          </div>
          <p class="nav-card__caption hover-interaction-c-2-target">Here should be a caption text</p>
        </a>
    `;

        // Create a template element and set its innerHTML to the template string
        const template = document.createElement('template');
        template.innerHTML = templateString;

        // Clone the template content
        const content = document.importNode(template.content, true);

        // Access and set the attributes
        const card = content.querySelector('.nav-card__link');
        card.href = this.getAttribute('hasLink') || '';
        card.title = this.getAttribute('linkTitle') || '';

        const image = content.querySelector('.nav-card__image');
        image.src = this.getAttribute('imgUrl') || '';
        image.alt = this.getAttribute('altText') || '';
        image.width = this.getAttribute('imgWidth') || '';
        image.height = this.getAttribute('imgHeight') || '';

        const caption = content.querySelector('.nav-card__caption');
        caption.textContent = this.getAttribute('caption') || 'Here should be a caption text';

        shadow.appendChild(content);

        // Apply CSS styles
        const style = document.createElement('style');
        style.textContent = `
        :host,
        .nav-card {
    --border-radius-image-figure: 5px;

    background-color: var(--color-background-figure, transparent);
    color: var(--color-text-figure, #000);
    height: max-content;
    display:block;
    box-sizing: border-box;
}

.nav-card__link {
    color: currentcolor;   
    display: flex;
    flex-direction: column;
    height: 100%;
    text-decoration: none;

    /* max-width: 278px; */
}

.nav-card__image {
    border-radius: var(--border-radius-image-figure, 5px);
    object-fit: cover;
    transition: all .3s ease-in-out;
    height: auto;
    aspect-ratio: 556/722;
    border: none;
    max-width: 100%;
}

.nav-card__link:hover .nav-card__image {
    transform: scale(1.025);
}

.nav-card__image-mask {
    border-radius: var(--border-radius-image-figure, 5px);
    overflow: hidden;
}

.nav-card__caption {
    margin: 0;
    line-height: 40px;
    text-align: left;
}

.nav-card .hover-interaction-c-2 .hover-interaction-c-2-target::after,
.nav-card .hover-interaction-c-2 .hover-interaction-c-2-target::before {
    bottom: 8px;
}
        `;

        shadow.appendChild(style);
    }
}

customElements.define('card-with-image', CardWithImage);