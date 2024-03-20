const { createApp } = Vue;
const NavBarMobileApp = createApp({
  delimiters: ["[[", "]]"],
  components: {},
  data() {
    return {
      isNavVisible: false,
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
    };
  },
  methods: {
    getNavDataFromWindowObject() {
      const navData = JSON.parse(window.navDataObject);

      this.navigationData = navData.navigationData;
      this.isLoading = false;
    },
    getNavData() {
      // Access the element with the ID 'NavBar' and retrieve the 'data-primary-nav' attribute
      const primaryNavAttribute = document
        .getElementById("NavBarMobile")
        .getAttribute("data-primary-nav");

      // Set the navigationData property based on the retrieved attribute
      this.navigationData = JSON.parse(primaryNavAttribute).navigationData;
      this.isLoading = false;
    },
    toggleNav() {
      this.isNavVisible = !this.isNavVisible;
      if (this.isNavVisible) {
        this.preventBodyScroll();
      } else {
        this.allowBodyScroll();
        this.resetNav();
      }
    },
    getNavBarMobileHeight() {
      // let navBarHeight = this.$refs.navBar.clientHeight;
      /*const navBar = document.getElementById("NavBar");*/
      const navBarMobile = document.querySelector(
        "#NavBarMobile .NavBarMobile__top"
      );

      // Create a ResizeObserver
      const resizeObserver = new ResizeObserver(setNavBarMobileHeight);

      // Observe changes in NavBar size
      resizeObserver.observe(navBarMobile);

      // Function to set CSS variable --MsgBarHeight
      function setNavBarMobileHeight() {
        const navBarMobileHeight = navBarMobile.clientHeight;
        document.documentElement.style.setProperty(
          "--NavBarHeight-mobile",
          navBarMobileHeight + "px"
        );
      }
    },
    setBodyPadding() {
      // Calculate the height of the NavBar
      const navBarHeightMobile = this.$refs.NavBarMobile__top.clientHeight;

      // Set padding-top for the body element
      // only if page has no hero
      const hasHeroAttribute = document
        .getElementById("masthead-mobile")
        .getAttribute("data-has-hero");
      // console.log(hasHeroAttribute);
      if (!hasHeroAttribute) {
        // Update CSS variable dynamically
        document.documentElement.style.setProperty(
          "--paddingTopMobile",
          navBarHeightMobile + "px"
        );
      }
      document.documentElement.style.setProperty(
        "--navBarHeightMobile",
        navBarHeightMobile + "px"
      );
    },
    preventBodyScroll() {
      document.body.style.position = "fixed";
    },
    allowBodyScroll() {
      document.body.style.removeProperty("position");
    },
    handleIntersection(entries) {
      this.isScrolled = entries[0].boundingClientRect.y < 0;
    },
    handleMobileNavItemClick(item) {
      if (item.childrenData) {
        // If there are children, navigate to the next level
        this.currentLevel += 1;
        this.stack.push(this.currentItems);
        this.currentItems = item.childrenData;
      } else {
        // If there are no children, handle the click based on your requirements
        // For example, you can navigate to a specific page or perform other actions
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
    resetNav() {
      // Reset the navigation state to level 1
      this.isNavVisible = false;

      // Reset other relevant data properties to their initial state
      this.currentLevel = 1;
      this.currentItems = [];
      this.stack = [];
      this.isGoingBack = false;
    },
  },
  created() {
    // this.getNavData();
    this.getNavDataFromWindowObject();
  },
  mounted() {
    // Set the navigationData property based on the retrieved attribute
    // this.navigationData = JSON.parse(primaryNavAttribute).navigationData;*/
    this.$nextTick(() => {
      // this.setBodyPadding();
      this.getNavBarMobileHeight();
    });

    // Create an IntersectionObserver
    const mastheadMobile = document.querySelector(".masthead-mobile");
    const pixelToWatch = document.querySelector("#pixel-to-watch-mobile");

    if (pixelToWatch) {
      const observer = new IntersectionObserver(this.handleIntersection);
      observer.observe(pixelToWatch);
    }
  },
});

NavBarMobileApp.config.isCustomElement = (tag) =>
  tag.startsWith("hamburger-") || tag.startsWith("lang-");

NavBarMobileApp.mount("#NavBarMobile");
