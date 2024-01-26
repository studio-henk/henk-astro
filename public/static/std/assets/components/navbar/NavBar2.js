const { createApp } = Vue;
import GalleryCard from "./GalleryCard.js";
createApp({
  delimiters: ["[[", "]]"],
  components: {
    GalleryCard,
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
    };
  },
  methods: {
    getNavData() {
      // Access the element with the ID 'NavBar' and retrieve the 'data-primary-nav' attribute
      const primaryNavAttribute = document
        .getElementById("NavBar")
        .getAttribute("data-primary-nav");

      // Set the navigationData property based on the retrieved attribute
      this.navigationData = JSON.parse(primaryNavAttribute).navigationData;
      this.isLoading = false;
    },
    getNavBarHeight() {
      // let navBarHeight = this.$refs.navBar.clientHeight;
      const navBar = document.getElementById("NavBar");

      // Create a ResizeObserver
      const resizeObserver = new ResizeObserver(setNavBarHeight);

      // Observe changes in NavBar size
      resizeObserver.observe(navBar);

      // Function to set CSS variable --MsgBarHeight
      function setNavBarHeight() {
        const navBarHeight = navBar.clientHeight;
        document.documentElement.style.setProperty(
          "--NavBarHeight-desktop",
          navBarHeight + "px"
        );
      }
    },
    setBodyOverflow() {
      document.body.style.overflow = "hidden";
    },
    removeBodyOverflow() {
      document.body.style.removeProperty("overflow");
    },
    handleIntersection(entries) {
      this.isScrolled = entries[0].boundingClientRect.y < 0;
    },
    handleNavBarMouseEnter() {
      this.statusNavBarHovered = true;
    },
    handleNavBarMouseLeave() {
      // console.log('Mouse leave');
      this.showSubmenu = false;
      this.statusNavBarHovered = false;
      this.resetSubmenu();
    },
    handleNavBarSubmenuMouseLeave() {
      // console.log("mouseLeave submenu");
    },
    handleNavBarSubmenuMouseOut() {
      // console.log("mouseOut submenu");
    },
    handleSubmenuOverlayTouch() {
      // console.log('Overlay touched');
      this.showSubmenu = false;
      this.statusNavBarHovered = false;
      this.resetSubmenu();
    },
    handleSubmenuOverlayMouseOver() {
      // console.log('Overlay MouseOver');
      this.showSubmenu = false;
      this.statusNavBarHovered = false;
      this.resetSubmenu();
      this.removeBodyOverflow();
    },
    handlePrimaryNavItemHover(item) {
      // console.log(`Hovered over ${item.navTitle}`);
      this.resetSubmenu();
      if (item.hasChildren) {
        this.submenuHeading = item.navTitle;
        this.currentItems = item.childrenData || [];
        this.showSubmenu = true;
        // overflow on body here to prevent scrolling while submenu open
        this.setBodyOverflow();
      } else {
        this.showSubmenu = false;
      }
    },
    handlePrimaryNavItemTouch(item) {
      // console.log("touched?");
    },
    handlePrimaryNavItemClick(item, event) {
      // console.log("clicked");
      if (item.childrenData) {
        // If there are children, prevent the default click action
        event.preventDefault();
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
      this.removeBodyOverflow();
    },
  },
  created() {
    this.getNavData();
  },
  mounted() {
    // Set the navigationData property based on the retrieved attribute
    // this.navigationData = JSON.parse(primaryNavAttribute).navigationData;*/
    this.$nextTick(() => {
      this.getNavBarHeight();
      // for debugging to keep menu open
      // this.handlePrimaryNavItemHover(this.navigationData[5]);
    });

    // const navBarSkeleton = document.querySelector(".nav-bar-skeleton");

    // Hide the skeleton by setting display: none; after removing the isLoading class
    // navBarSkeleton.classList.remove("isLoading");
    // navBarSkeleton.style.display = "none";

    // Create an IntersectionObserver
    // const mastheadDesktop = document.querySelector(".masthead-desktop");
    const pixelToWatch = document.querySelector("#pixel-to-watch");

    if (pixelToWatch) {
      const observer = new IntersectionObserver(this.handleIntersection);
      observer.observe(pixelToWatch);
    }
  },
}).mount("#NavBar");
