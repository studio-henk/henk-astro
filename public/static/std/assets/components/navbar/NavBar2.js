const {createApp} = Vue;
import GalleryCard from './GalleryCard.js'
import DiscountTimer from "./DiscountTimer.js";
createApp({
    delimiters: ["[[", "]]"],
    components: {
        GalleryCard,
        DiscountTimer
    },
    data() {
        return {
            isLoading: true,
            stack: [],
            showSubmenu: false,
            submenuHeading: "",
            statusNavBarHovered: false,
            isScrolled: false,
            currentLevel: 1,
            currentItems: [],
            isGoingBack: false,
            navigationData: null,
        }
    },
    methods: {
        getNavData() {
            // Access the element with the ID 'NavBar' and retrieve the 'data-primary-nav' attribute
            const primaryNavAttribute = document.getElementById('NavBar').getAttribute('data-primary-nav');

            // Set the navigationData property based on the retrieved attribute
            this.navigationData = JSON.parse(primaryNavAttribute).navigationData;
            this.isLoading = false;
        },
        setBodyPadding() {
            // Calculate the height of the NavBar
            const navBarHeight = this.$refs.navBar.clientHeight;

            // Set padding-top for the body element
            // only if page has no hero
            const hasHeroAttribute = document.getElementById('masthead-desktop').getAttribute('data-has-hero');
            if (!hasHeroAttribute) {
                document.body.style.paddingTop = `${navBarHeight}px`;
            }
        },
        handleIntersection(entries) {
            this.isScrolled = entries[0].boundingClientRect.y < 0;
        },
        handleNavBarMouseEnter() {
          this.statusNavBarHovered = true;
        },
        handleNavBarMouseLeave() {
            console.log('Mouse leave');
            this.showSubmenu = false;
            this.statusNavBarHovered = false;
            this.resetSubmenu();
        },
        handleNavBarSubmenuMouseLeave() {
          console.log("mouseLeave submenu");
        },
        handleNavBarSubmenuMouseOut() {
            console.log("mouseOut submenu");
        },
        handlePrimaryNavItemHover(item) {
            // console.log(`Hovered over ${item.navTitle}`);
            this.resetSubmenu();
            if (item.hasChildren) {
                this.submenuHeading = item.navTitle;
                this.currentItems = item.childrenData || [];
                this.showSubmenu = true;
            } else {
                this.showSubmenu = false;
            }
        },
        navigateToNextLevel(item) {
            this.currentLevel += 1;
            this.stack.push(this.currentItems);
            this.currentItems = item.childrenData || [item];
        },
        navigateToPreviousLevel() {
            if (this.currentLevel > 1) {
                this.currentLevel -= 1;
                this.currentItems = this.stack.pop() || [];
            }
        },
        resetSubmenu() {
            this.submenuHeading = "";
            this.currentLevel = 1;
            this.currentItems = [];
            this.stack = [];
            this.isGoingBack = false;
        },
    },
    created() {
        this.getNavData();
    },
    mounted() {
        // Set the navigationData property based on the retrieved attribute
        // this.navigationData = JSON.parse(primaryNavAttribute).navigationData;*/
        this.$nextTick(() => {
            this.setBodyPadding();
            // for debugging to keep menu open
            this.handlePrimaryNavItemHover(this.navigationData[5]);
        });

        const navBarSkeleton = document.querySelector(".nav-bar-skeleton");

        // Hide the skeleton by setting display: none; after removing the isLoading class
        navBarSkeleton.classList.remove("isLoading");
        navBarSkeleton.style.display = "none";

        // Create an IntersectionObserver
        const mastheadDesktop = document.querySelector(".masthead-desktop");
        const pixelToWatch = document.querySelector("#pixel-to-watch");

        if (pixelToWatch) {
            const observer = new IntersectionObserver(this.handleIntersection);
            observer.observe(pixelToWatch);
        }

    },
}).mount('#NavBar')