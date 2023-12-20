export default {
    delimiters: ["[[", "]]"],
    template: `<div class="gallery-card-template" id="gallery-card-template">
      <div v-if="category.childrenData" class="card" @click="emitNavigateEvent"
         :style="{ 'animation-delay': index * 0.3 + 's' }">
        <!-- Skeleton Loader -->
        <div v-if="!imageLoaded" class="skeleton-loader">
            <div class="card__image"></div>
            <p class="card__title">[[ category.navTitle ]]</p>
        </div>
        <div class="card__image-container inner" v-show="imageLoaded">
            <!-- Actual Image -->
            <img v-show="imageLoaded" :src="category.image" width="1020" height="1530" alt="" class="card__image"
                 @load="handleImageLoad" @error="handleImageError" loading="eager" fetchpriority="high" />
        </div>
        <p v-show="imageLoaded" class="card__title">[[ category.navTitle ]]</p>
    </div>
    <a v-else class="card page-link" :style="{ 'animation-delay': index * 0.3 + 's' }"
       :href="category.url">
        <!-- Skeleton Loader -->
        <div v-if="!imageLoaded" class="skeleton-loader">
            <div class="card__image"></div>
            <p class="card__title">[[ category.navTitle ]]</p>
        </div>
        <div class="card__image-container inner" v-show="imageLoaded">
            <img v-show="imageLoaded" :src="category.image" width="1020" height="1530" alt="" class="card__image" @load="handleImageLoad" @error="handleImageError" loading="eager" fetchpriority="high" />
        </div>
        <p v-show="imageLoaded" class="card__title">[[ category.navTitle ]]</p>
    </a>
    </div>
    `,
    props: {
        category: Object,
        index: Number
    },
    data() {
        return {
            imageLoaded: false,
        };
    },
    methods: {
        emitNavigateEvent() {
            this.$emit('navigate', this.category);
        },
        handleImageLoad(event) {
            this.imageLoaded = true;
        },
        handleImageError() {
            console.error('Error loading image:', this.category.image);
        },
    },
}